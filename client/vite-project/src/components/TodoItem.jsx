function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className="todo-item">
      <span
        onClick={() => onToggle(todo._id)}
        style={{
          textDecoration: todo.done ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {todo.title}
      </span>

      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
