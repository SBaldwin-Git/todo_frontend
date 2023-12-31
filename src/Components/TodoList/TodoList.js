import React from 'react'
import Todo from '../Todo/Todo'

function TodoList({ todos}) {
  return (
      <div>
          {todos.map((todo, index) => (
              <Todo key={index} todo={todo.todo} />
            ))}
    </div>
  )
}

export default TodoList