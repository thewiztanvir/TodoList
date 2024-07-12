import React, { useState } from "react";
import "./App.css";
import Header from "./Header.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      updateTodo();
    } else {
      addTodo();
    }
    setInputValue("");
  };

  const addTodo = () => {
    setTodos([...todos, { text: inputValue, completed: false }]);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === editIndex ? { ...todo, text: inputValue } : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
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

  const incompleteTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="container">
      <div className="card">
        <Header
          className="header"
          todos_completed={incompleteTodos}
          total_todos={todos.length}
        />

        <div className="task-list-part">
          <h1>Today's Todo List</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              placeholder="Write Your Next Task"
              type="text"
              value={inputValue}
              onChange={handleChange}
              className="input-style"
            />
            <button className="btn" type="submit">
              {editIndex !== null ? (
                <FontAwesomeIcon icon={faEdit} className="icon" />
              ) : (
                "+"
              )}
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <li
                className={`task-list ${todo.completed ? "completed" : ""} listStyle`}
                key={index}
              >
                <input
                  type="radio"
                  checked={todo.completed}
                  onChange={() => handleComplete(index)}
                />
                {todo.text}
                <div>
                  <button onClick={() => handleEdit(index)}>
                    <FontAwesomeIcon icon={faEdit} className="icon" />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
