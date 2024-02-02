import styled from "@emotion/styled";

export const TaskWrapper = styled.div`
  padding: 0.7rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftItemWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
`;

export const RightItemWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 44px;
`;

export const TaskInputField = styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: red;
`;

export const ContentContainer = styled.div<{ isCompleted: boolean }>`
  line-through: ${(props) => (props.isCompleted ? "line-through" : "none")};
  text-wrap: ${(props) => (props.isCompleted ? "break-word" : "none")};
  color: green;
  display: block;
`;

export const StarIconWrapper = styled.div<{ isImportant: boolean }>`
  opacity: ${(props) => (!props.isImportant ? "0.2" : "1")};
  &:hover {
    opacity: 1;
  }
`;
