import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--bg-200);
  background-color: var(--bg-300);
  color: var(--text-100);
  font-size: 1rem;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--bg-200);
  background-color: var(--bg-300);
  color: var(--text-100);
`;

export const Textarea = styled.textarea`
  color: var(--text-100);
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid var(--bg-200);
  background-color: var(--bg-300);
  resize: vertical;
  outline: none;
  transition: border-color 0.3s ease;
`;
