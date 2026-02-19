import { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAddTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Add todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
