import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setItems([...items, { id: Date.now(), text, done: false }]);
    setText("");
  }
  function toggle(id) {
    setItems(items.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }
  function remove(id) {
    setItems(items.filter(t => t.id !== id));
  }

  return (
    <div className="app">
      <h1>Todo (React)</h1>
      <form onSubmit={add}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="add a task" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map(t => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <span onClick={() => toggle(t.id)}>{t.text}</span>
            <button onClick={() => remove(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
