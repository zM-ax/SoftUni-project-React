import styled from "styled-components";

export const UploaderContainer = styled.div`
  padding: 1rem 1.25rem;
  border: 1px dashed #555;
  border-radius: 8px;
  margin: 1rem auto;
  max-width: 600px;
  background: #050505;
`;

export const UploaderTitle = styled.h3`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.1rem;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
`;

export const Label = styled.label`
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #555;
  background: #111;
  color: #fff;
  font-size: 0.9rem;
`;

export const Textarea = styled.textarea`
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #555;
  background: #111;
  color: #fff;
  font-size: 0.9rem;
  min-height: 70px;
  resize: vertical;
`;

export const Select = styled.select`
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #555;
  background: #111;
  color: #fff;
  font-size: 0.9rem;
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const LogList = styled.ul`
  margin-top: 1rem;
  font-size: 0.9rem;
`;
