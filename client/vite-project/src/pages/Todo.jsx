import { useEffect, useState } from "react";
import api from "../services/api";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("en");

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
    <div className={`todo-container ${darkMode ? "dark" : "light"}`}>
      <div className="top-bar">
        <button
          type="button"
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode
            ? lang === "hy"
              ? "Բաց ռեժիմ"
              : "Light Mode"
            : lang === "hy"
              ? "Մութ ռեժիմ"
              : "Dark Mode"}
        </button>

        <button
          type="button"
          className="theme-btn"
          onClick={() => setLang(lang === "hy" ? "en" : "hy")}
        >
          {lang === "hy" ? "English" : "Հայերեն"}
        </button>
      </div>

      <h1>{lang === "hy" ? "Անելիքների ցանկ" : "Todo List"}</h1>

      <div className="add-box">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={lang === "hy" ? "Նոր առաջադրանք" : "New Todo"}
        />

        <button onClick={addTodo}>{lang === "hy" ? "Ավելացնել" : "Add"}</button>
      </div>

      {todos.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {lang === "hy" ? "Դատարկ է" : "No todos yet"}
        </p>
      ) : (
        todos.map((todo) => (
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

            <button onClick={() => deleteTodo(todo._id)}>
              {lang === "hy" ? "Ջնջել" : "Delete"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Todo;
