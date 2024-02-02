import { TTask } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ListItem from "./Item";
import { FILTER_LIST } from "@/constants";
import { FilterTab } from "@/components";
import { TodoSchema } from "@/models";
import { v4 as uuidv4 } from "uuid";
import {
  CardContainer,
  CardWrapper,
  ErrorMessage,
  FormContainer,
  HeaderTitle,
  InputField,
  SubmitButton,
  TaskListContainer,
  TodoListContainer,
  Wrapper,
} from "@/styles/TodoListStyled";

const TodoListPage = () => {
  const [todo, setTodo] = useState<TTask[]>([]);
  const [error, setError] = useState<string>("");
  const [taskContent, setTaskContent] = useState<string>("");
  const [filter, setFilter] = useState<string>("ALL");
  const { t } = useTranslation();
  const handleAddTodo = () => {
    const newTask = {
      id: uuidv4(),
      content: taskContent,
      isCompleted: false,
      isImportant: false,
    };
    const todoValidate = handleValidate(newTask);
    if (todoValidate) {
      clearTaskContent();
      setTodo((prevTodo) => {
        const newTodo = [...prevTodo, todoValidate];
        setStore(newTodo);
        return newTodo;
      });
    }
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
    setError("");
  };

  const handleTaskContent = (value: string) => {
    if (taskContent.length > 0) {
      setError("");
    }
    setTaskContent(value);
  };

  const handleDeleteTodo = (id: string) => {
    setTodo((prevTodo) => {
      const newTodo = prevTodo.filter((todo) => todo.id !== id);
      setStore(newTodo);
      return newTodo;
    });
  };

  const handleCompleteTodo = (id: string) => {
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      setStore(newTodo);
      return newTodo;
    });
  };

  const handleEditTodo = (id: string, content: string) => {
    let todoEdit = {};
    todo.filter((item) => {
      if (item.id === id) {
        todoEdit = {
          ...item,
          content,
        };
      }
    });
    const validateTodo = handleValidate(todoEdit as TTask);
    if (!validateTodo) {
      return;
    }
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo) =>
        todo.id === id ? { ...todo, content } : todo
      );
      setStore(newTodo);
      return newTodo;
    });
  };

  const handleImportantTodo = (id: string) => {
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

  const handleValidate = (todoTask: TTask) => {
    try {
      const validateData = TodoSchema.safeParse(todoTask);
      if (!validateData.success) {
        console.log(validateData);
        validateData.error.issues.map((error) => {
          setError(error.message);
          return;
        });
        return false;
      }
      return todoTask;
    } catch (error) {
      console.log(error);
    }
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
    <TodoListContainer>
      <CardWrapper>
        <CardContainer>
          <HeaderTitle>{t("APP_TITLE")}</HeaderTitle>
          <FormContainer>
            <Wrapper>
              <InputField
                type="search"
                placeholder={t("PLACEHOLDER")}
                value={taskContent}
                onChange={(e) => handleTaskContent(e.target.value)}
              />
              <SubmitButton type="button" onClick={handleAddTodo}>
                Add
              </SubmitButton>
            </Wrapper>
            <Wrapper>
              {error ? <ErrorMessage>{error}</ErrorMessage> : ""}
            </Wrapper>
          </FormContainer>
          <FilterTab
            onSelectFilter={(key) => onSelectFilter(key)}
            items={FILTER_LIST}
            activeFilter={filter}
          />
          <TaskListContainer>
            {filterTodo.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  handleDeleteTodo={handleDeleteTodo}
                  handleCompleteTodo={handleCompleteTodo}
                  handleImportantTodo={handleImportantTodo}
                  handleEditTodo={handleEditTodo}
                  error={error}
                />
              );
            })}
          </TaskListContainer>
        </CardContainer>
      </CardWrapper>
    </TodoListContainer>
  );
};

export default TodoListPage;
