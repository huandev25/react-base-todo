import { TTask } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ListItem from "./Item";
import { FILTER_LIST } from "@/constants";
import { FilterTab } from "@/components";
const TodoListPage = () => {
  const [todo, setTodo] = useState<TTask[]>([]);
  const [taskContent, setTaskContent] = useState<string>("");
  const [filter, setFilter] = useState<string>("ALL");
  const { t } = useTranslation();
  const handleAddTodo = () => {
    if (!taskContent) return;
    const newTask = {
      id: todo.length + 1,
      content: taskContent,
      isCompleted: false,
      isImportant: false,
    };
    clearTaskContent();
    setTodo((prevTodo) => {
      const newTodo = [...prevTodo, newTask];
      setStore(newTodo);
      return newTodo;
    });
  };

  const setStore = (newTodo: TTask[]) => {
    localStorage.setItem("todo", JSON.stringify(newTodo));
  };

  useEffect(() => {
    const storedData = localStorage.getItem("todo");
    if (storedData) {
      setTodo(JSON.parse(storedData));
    }
  }, []);

  const clearTaskContent = () => {
    setTaskContent("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodo((prevTodo) => {
      const newTodo = prevTodo.filter((todo) => todo.id !== id);
      setStore(newTodo);
      return newTodo;
    });
  };

  const handleCompleteTodo = (id: number) => {
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      setStore(newTodo);
      return newTodo;
    });
  };

  const handleEditTodo = (id: number, content: string) => {
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo) =>
        todo.id === id ? { ...todo, content: content } : todo
      );
      setStore(newTodo);
      return newTodo;
    });
  };

  const handleImportantTodo = (id: number) => {
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
      );
      setStore(newTodo);
      return newTodo;
    });
  };

  const onSelectFilter = (filterKey: string) => {
    setFilter(filterKey);
  };

  const filterTodo = todo.filter((todo) => {
    switch (filter) {
      case "COMPLETED":
        return todo.isCompleted;
      case "INCOMPLETE":
        return !todo.isCompleted;
      case "IMPORTANT":
        return todo.isImportant;
      default: {
        return true;
      }
    }
  });

  return (
    <div
      id="#todo"
      className="flex flex-col h-screen justify-between bg-[url('/src/assets/images/background.jpg')]"
    >
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white w-1/3 h-5/6 p-4 items-center flex flex-col rounded-md shadow-lg">
          <div className="flex">
            <span className="text-center text-3xl text-red-800 py-7">
              {t("APP_TITLE")}
            </span>
          </div>
          <div className="flex w-11/12 rounded">
            <input
              type="search"
              className="px-3 py-2 w-full rounded-md mx-2 border-2 border-yellow-600 focus:outline-none focus:border-yellow-700"
              placeholder={t("PLACEHOLDER")}
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
            />
            <button
              type="button"
              className="flex items-center justify-center bg-yellow-600 text-white px-4 rounded"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
          <FilterTab
            onSelectFilter={(key) => onSelectFilter(key)}
            items={FILTER_LIST}
            activeFilter={filter}
          />
          <div className="flex flex-col my-3 justify-start w-11/12 scroll-m-0 max-h-screen overflow-y-auto scroll-smooth scroll-hidden">
            {filterTodo.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  handleDeleteTodo={handleDeleteTodo}
                  handleCompleteTodo={handleCompleteTodo}
                  handleImportantTodo={handleImportantTodo}
                  handleEditTodo={handleEditTodo}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;
