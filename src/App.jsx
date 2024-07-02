import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import darkThemeIcon from './imgs/icons8-dark-theme-64.png'
import lightThemeIcon from './imgs/icons8-light-64.png'

function App() {
  const [todos, setTodos] = useState([])
  const [theme, setTheme] = useState('light')

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const toggleTheme = ()=> {
    setTheme((prevTheme)=> prevTheme === 'light' ? 'dark':'light');
    // console.log(theme);
  }
  
  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(theme);
    console.log(theme);
  }, [theme])
  

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete, theme, toggleTheme}}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:shadow-xl dark:shadow-gray-900/30 rounded-lg overflow-hidden transition duration-300 ease-in-out">
          <div className='flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
            <h1 className="text-2xl text-gray-800 dark:text-white font-bold">Manage Your Todos</h1>
            <button 
              onClick={toggleTheme} 
              className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300'
            >
              <img 
                src={theme === 'dark' ? darkThemeIcon : lightThemeIcon} 
                alt="Toggle Theme" 
                className="w-6 h-6"
              />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <TodoForm />
            </div>
            
            <div className="space-y-4">
              {todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
