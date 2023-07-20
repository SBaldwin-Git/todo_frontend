import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "../TodoList/TodoList";

function App() {
  // create use state for todo components
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // create use effect to fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    let response = await fetch(
      "http://fullstack-learning-todo-backend.netlify.app/api/todos",
      {
        method: "GET",
      }
    );

    // This code works, however it creates duplicates of the todos
    // let data = await response.json();
    // const newTodos = data.payload.map((todo) => ({ todo: todo.description }));
    // setTodos([...todos, ...newTodos]);

    let data = await response.json();
    const newTodos = data.payload.map((todo) => ({ todo: todo.description }));
    setTodos(newTodos); // Replace existing todos with fetched todos
  }

  // create setTodos function
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      "http://fullstack-learning-todo-backend.netlify.app/api/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: inputValue }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    fetchTodos();
    setInputValue("");
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className="App">
      <h1>Todo Frontend</h1>
      <h2>Todo Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="inputBox"
        />
        <button type="submit">Submit</button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
}

export default App;
