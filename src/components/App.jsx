import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import Context from './Context';


export default function App() {
  const [todos, setTodos] = useState ([])
  const [todoTitle, setTodoTitle] = useState('');

  

  useEffect(() => {
    const raw = localStorage.getItem('todos') || [];
    setTodos(JSON.parse(raw));
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  const addTodo = e => {
    if (e.key === 'Enter') {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: todoTitle,
          completed: false,
        }
      ])

      setTodoTitle('');
    }
  }

  const removeTodo = id => {
    setTodos(todos.filter(todo => {
      return todo.id !== id
    }))
  }

  const toggleTodo = id => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }

      return todo;
    }))
  }
  
  return (
    <Context.Provider value={{
        toggleTodo, removeTodo
      }}>
        <div>
        <h1>Todo app</h1>
        
        <div>
          <input
            type='text'
            value={todoTitle}
            onChange={e => setTodoTitle(e.target.value)}
            onKeyDown={addTodo}
          />
          <label>Todo name</label>
        </div>

        <TodoList todos={todos} />
      </div>
      </Context.Provider>
      
    );
  };
