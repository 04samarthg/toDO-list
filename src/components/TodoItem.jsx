import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    //console.log(todo.id);
    toggleComplete(todo.id)
  }

  return (
      <div
        className={`flex items-center border rounded-lg px-4 py-3 gap-x-3 shadow-sm transition duration-300 ${
          todo.completed 
            ? "bg-green-100 dark:bg-green-800/30 border-green-200 dark:border-green-700" 
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        }`}
      >
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={`flex-grow outline-none bg-transparent rounded ${
            isTodoEditable ? "border border-gray-300 dark:border-gray-600 px-2 py-1" : "border-transparent"
          } ${todo.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        <button
          className={`p-2 rounded-lg text-sm justify-center items-center shrink-0 transition duration-200 ${
            todo.completed
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-700/50"
          }`}
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
          aria-label={isTodoEditable ? "Save todo" : "Edit todo"}
        >
          {isTodoEditable ? "💾" : "✏️"}
        </button>
        <button
          className="p-2 rounded-lg text-sm justify-center items-center bg-red-100 dark:bg-red-800/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-700/50 shrink-0 transition duration-200"
          onClick={() => deleteTodo(todo.id)}
          aria-label="Delete todo"
        >
          🗑️
        </button>
      </div>
  );
}

export default TodoItem;
