import {TTask} from "@/types";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ListItem from "./Item";
import {FILTER_LIST} from "@/constants";
import {FilterTab} from "@/components";
import {TodoSchema} from "@/models";
import { v4 as uuidv4 } from 'uuid';

const TodoListPage = () => {
    const [todo, setTodo] = useState<TTask[]>([]);
    const [error, setError] = useState<string>("");
    const [taskContent, setTaskContent] = useState<string>("");
    const [filter, setFilter] = useState<string>("ALL");
    const {t} = useTranslation();
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
    }

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
                todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
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
                        content: content
                    }
                }
            }
        );
        const validateTodo = handleValidate(todoEdit as TTask);
        if (!validateTodo) {
            return;
        }
        setTodo((prevTodo) => {
            const newTodo = prevTodo.map((todo) =>
                todo.id === id ? {...todo, content: content} : todo
            );
            setStore(newTodo);
            return newTodo;
        });
    };

    const handleImportantTodo = (id: string) => {
        setTodo((prevTodo) => {
            const newTodo = prevTodo.map((todo) =>
                todo.id === id ? {...todo, isImportant: !todo.isImportant} : todo
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
    }

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
                <div className="bg-white w-4/4 h-5/6 p-4 items-center flex flex-col rounded-md shadow-lg">
                    <div className="flex">
                        <span className="text-center text-3xl text-red-800 py-7">
                          {t("APP_TITLE")}
                        </span>
                    </div>
                    <div className="flex-col w-11/12 rounded">
                        <div className="flex w-12/12">
                            <input
                                type="search"
                                className="px-3 py-2 w-full rounded-md mx-2 border-2 border-yellow-600 focus:outline-none focus:border-yellow-700"
                                placeholder={t("PLACEHOLDER")}
                                value={taskContent}
                                onChange={(e) => handleTaskContent(e.target.value)}
                            />
                            <button
                                type="button"
                                className="flex items-center justify-center bg-yellow-600 text-white px-4 rounded"
                                onClick={handleAddTodo}
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex w-12/12">
                            {error ? <span className="text-red-500 text-sm">{error}</span> : ''}
                        </div>
                    </div>
                    <FilterTab
                        onSelectFilter={(key) => onSelectFilter(key)}
                        items={FILTER_LIST}
                        activeFilter={filter}
                    />
                    <div
                        className="flex flex-col my-3 justify-start w-11/12 scroll-m-0 max-h-screen overflow-y-auto scroll-smooth scroll-hidden">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoListPage;
