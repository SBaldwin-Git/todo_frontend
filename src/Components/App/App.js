import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "../TodoList/TodoList";

function App() {
  // create use state for todo components
  const [todos, setTodos] = useState([{ todo: "hello" }, { todo: "bye" }]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    let response = await fetch("http://localhost:3005/api/todos", {
      method: "GET",
    });

    let data = await response.json();
    console.log(data.payload[0].description);
  }

  // create setTodos function
  function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked");
    setTodos([...todos, { todo: inputValue }]);
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
        <button type="submit">
          Submit
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
}

export default App;
