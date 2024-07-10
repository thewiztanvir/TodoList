import React, { useState } from "react";
import "./App.css";
import Header from "./Header.jsx";


function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, text: inputValue } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: inputValue, completed: false }]);
    }
    setInputValue("");
  }

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const incompleteTodos = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <div className="container">
        <Header className="header" todos_completed={incompleteTodos} total_todos={todos.length} />

        <div className="task-list-part">
          <h1>Todo List</h1>
          <form className="form">
            <input
              placeholder="Write Your Next Task"
              type="text"
              value={inputValue}
              onChange={handleChange}
            />
            <button className="btn" onClick={handleSubmit}>
              {editIndex !== null ? "Edit" : "+"}
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <li className={`task-list ${todo.completed ? "completed" : ""}`} key={index}>
                <input
                  type="radio"
                  checked={todo.completed}
                  onChange={() => handleComplete(index)}
                />
                {todo.text}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todo;
