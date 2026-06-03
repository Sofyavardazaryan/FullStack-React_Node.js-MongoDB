import { useEffect, useState } from "react";
import api from "../services/api";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const loadTodos = async () => {
    try {
      const res = await api.get("/todos", config);
      setTodos(res.data.todos || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    await api.post("/todos", { title }, config);
    setTitle("");
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`, config);
    loadTodos();
  };

  const toggleTodo = async (id) => {
    await api.patch(`/todos/${id}`, {}, config);
    loadTodos();
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>

      <div className="add-box">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Todo"
        />

        <button onClick={addTodo}>Add</button>
      </div>

      {todos.map((todo) => (
        <div className="todo-item" key={todo._id}>
          <span
            onClick={() => toggleTodo(todo._id)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.title}
          </span>

          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Todo;