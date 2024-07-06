import React from "react";
import "./App.css";
import Header from "./Header.jsx";
import { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodos([...todos, inputValue]);
    setInputValue("");
  }

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="container">
        <Header className="header" todos_completed={todos.length} total_todos={todos.length}  />

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
              +
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <li className="task-list" key={index}>
                {todo}
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
