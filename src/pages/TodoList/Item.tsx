import {CheckCircleIcon, StarIcon} from "@/assets/svg";
import XMarkIcon from "@/assets/svg/XmarkIcon";
import {TTask} from "@/types";
import {useState} from "react";
import {useTranslation} from "react-i18next";

type TListItemProps = {
    item: TTask;
    handleDeleteTodo: (id: string) => void;
    handleImportantTodo: (id: string) => void;
    handleCompleteTodo: (id: string) => void;
    handleEditTodo: (id: string, content: string) => void;
    error?: string;
};

const ListItem = (props: TListItemProps) => {
    const {
        item,
        handleDeleteTodo,
        handleImportantTodo,
        handleCompleteTodo,
        handleEditTodo
    } = props;
    const {t} = useTranslation();
    const [isEdited, setIsEdited] = useState(false);
    const [currentContent, setCurrentContent] = useState(item.content);

    const handleOnblur = () => {
        setIsEdited(false);
        handleEditTodo(item.id, currentContent.length === 0 ? item.content : currentContent);
    }
    const handleOnchange = (value: string) => {
        setCurrentContent(value);
    }

    const handleDoubleClick = () => {
        setIsEdited(true);
        setCurrentContent(item.content)
    }


    return (
        <div className="py-1 flex justify-between items-center">
            <div className="flex flex-1 gap-1 items-center">
                <button
                    className="w-[20px]"
                    onClick={() => {
                        handleCompleteTodo(item.id);
                    }}
                >
                    <CheckCircleIcon
                        width={20}
                        className={!item.isCompleted ? "opacity-10" : ""}
                    />
                </button>
                {!isEdited ? (
                    <div
                        className={`text-wrap block flex-wrap text-green-800 ${
                            item.isCompleted ? "line-through" : ""
                        }`}
                        onDoubleClick={handleDoubleClick}
                    >
                        {item.content}
                    </div>
                ) : (
                    <input
                        onBlur={handleOnblur}
                        autoFocus
                        type="text"
                        className="w-full text-red-700 rounded-md border-none focus:outline-none "
                        placeholder={t("PLACEHOLDER_UPDATE")}
                        value={currentContent}
                        onChange={(e) => handleOnchange(e.target.value)}
                    />
                )}
            </div>
            <div className="flex gap-1 w-[44px]">
                <button
                    onClick={() => {
                        handleImportantTodo(item.id);
                    }}
                >
                    <StarIcon
                        width={20}
                        fill="gold"
                        className={!item.isImportant ? "opacity-10" : ""}
                    />
                </button>
                <button
                    onClick={() => {
                        handleDeleteTodo(item.id);
                    }}
                >
                    <XMarkIcon width={20}/>
                </button>
            </div>
        </div>
    );
};

export default ListItem;
