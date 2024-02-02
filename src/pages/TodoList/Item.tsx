import { CheckCircleIcon, StarIcon } from "@/assets/svg";
import XMarkIcon from "@/assets/svg/XmarkIcon";
import {
  ContentContainer,
  LeftItemWrapper,
  RightItemWrapper,
  StarIconWrapper,
  TaskInputField,
  TaskWrapper,
} from "@/styles/TodoItemStyled";
import { TTask } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
    handleEditTodo,
  } = props;
  const { t } = useTranslation();
  const [isEdited, setIsEdited] = useState(false);
  const [currentContent, setCurrentContent] = useState<string>(item.content);

  const handleOnblur = () => {
    setIsEdited(false);
    handleEditTodo(
      item.id,
      currentContent.length === 0 ? item.content : currentContent.toString()
    );
  };
  const handleOnchange = (value: string) => {
    setCurrentContent(value);
  };

  const handleDoubleClick = () => {
    setIsEdited(true);
    setCurrentContent(item.content);
  };

  return (
    <TaskWrapper>
      <LeftItemWrapper>
        <button
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
          <ContentContainer
            isCompleted={item.isCompleted}
            onDoubleClick={handleDoubleClick}
          >
            {item.content}
          </ContentContainer>
        ) : (
          <TaskInputField
            onBlur={handleOnblur}
            autoFocus
            type="text"
            placeholder={t("PLACEHOLDER_UPDATE")}
            value={currentContent}
            onChange={(e) => handleOnchange(e.target.value.toString())}
          />
        )}
      </LeftItemWrapper>
      <RightItemWrapper>
        <button
          onClick={() => {
            handleImportantTodo(item.id);
          }}
        >
          <StarIconWrapper isImportant={item.isImportant}>
            <StarIcon width={20} fill="gold" />
          </StarIconWrapper>
        </button>
        <button
          onClick={() => {
            handleDeleteTodo(item.id);
          }}
        >
          <XMarkIcon width={20} />
        </button>
      </RightItemWrapper>
    </TaskWrapper>
  );
};

export default ListItem;
