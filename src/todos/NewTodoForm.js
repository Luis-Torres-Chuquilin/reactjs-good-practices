/** @format */

import React, { useState } from "react";

// Redux
import { connect } from "react-redux";
import { getTodos } from "../redux/selectors/selectors";
// import { createTodo } from "../redux/actions/actions";

// Thunks
import { addTodoRequest } from "../redux/thunks/thunk";

// Style
import "./NewTodoForm.css";

// connect()()
const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="new-todo-form">
      <input
        className="new-todo-input"
        type="text"
        placeholder="Type your new todo here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="new-todo-button"
        onClick={() => {
          const isDuplicateText = todos.some(
            (todo) => todo.text === inputValue
          );
          if (!isDuplicateText) {
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }}
      >
        Create Todo
      </button>
    </div>
  );
};

// Redux Store
const mapStateToProps = (state) => ({
  todos: getTodos(state),
});
const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (text) => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
// export default NewTodoForm;
