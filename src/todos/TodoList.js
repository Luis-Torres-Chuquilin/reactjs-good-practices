/** @format */

import React, { useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

// Redux
import { connect } from "react-redux";

// Thunks
import { displayAlert } from "../redux/thunks/thunk";
import { loadTodos } from "../redux/thunks/thunk";
import { removeTodoRequest } from "../redux/thunks/thunk";
import { markTodoAsCompletedRequest } from "../redux/thunks/thunk";

// Selectors
import {
  getTodos,
  getTodosLoading,
  getCompletedTodos,
  getIncompletedTodos,
} from "../redux/selectors/selectors";

const TodoList = ({
  // todos = [],
  completedTodos,
  incompleteTodos,
  onRemovePressed,
  onCompletedPressed,
  onDisplayAlertClicked,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;

  const content = (
    <div className="list-wrapper">
      <NewTodoForm />
      <h3>Incomplete:</h3>

      {incompleteTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
      <h3>Completed</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </div>
  );
  return isLoading ? loadingMessage : content;
};

// STATES CALLED FROM THE STORE, USE IN TODO LIST
const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  // todos: getTodos(state),
  // Reselectors
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompletedTodos(state),
});

// Dispatch Actions that call reducers
const mapDispatchToProps = (dispatch) => ({
  // Thunk ->  dispatch 3 actions
  startLoadingTodos: () => dispatch(loadTodos()), // thunk
  //
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
// export default TodoList;
