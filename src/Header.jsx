import React from "react";
import "./App.css";

function Header({ todos_completed, total_todos }) {
  return (
    <>
      <div className="header">
        <div className="header-top">
          <h1>Task Done</h1>
          <p>Keep it up</p>
        </div>
        <div className="header-text">
          {todos_completed}/{total_todos}
          
        </div>
      </div>
    </>
  );
}

export default Header;
