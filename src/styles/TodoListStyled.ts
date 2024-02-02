import styled from "@emotion/styled";
export const TodoListContainer = styled.div`
  display: flex;
  background-color: gold;
  justify-content: between;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
`;

export const CardContainer = styled.div`
  display: flex;
  padding: 4rem;
  border-radius: 1rem;
  flex-direction: column;
  align-items: center;
  width: 800px;
  height: 600px;
  background-color: white;
  box-shadow: 10px 10px 5px 12px lightblue;
`;

export const HeaderTitle = styled.span`
  text-align: center;
  font-size: 3rem;
  text-color: #333;
  padding-bottom: 3rem;
`;

export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  width: 100%;
`;

export const SubmitButton = styled.button`
  background-color: rgb(202, 138, 4);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 1rem;
  margin: 0.5rem 0.5rem;
`;

export const InputField = styled.input`
  padding: 0.5rem 1rem;
  width: 100%;
  border-radius: 0.5rem;
  outline: none;
  border: 1px solid #ca8a04;
  margin: 0 0.5rem 0 0;
`;
