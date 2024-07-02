import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()

      if (!todo) return

      addTodo({ todo, completed: false})
      setTodo("")
    }

  return (
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Write Todo..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200 ease-in-out"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            required
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
          </span>
        </div>
        <button 
          type="submit" 
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add
        </button>
      </form>
  );
}

export default TodoForm;
