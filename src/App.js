import React, { useState, useEffect } from "react";
import "./App.css";
import { useTable } from "react-table";

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="taskList"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      <span onClick={() => completeTask(index)}>{task.title}</span>
      <button class="delete" onClick={() => removeTask(index)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
    </div>
  );
}

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    addTask(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="task">
      <input
        type="text"
        className="input"
        placeholder="Add New Task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function Todo() {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasksCompleted, settasksCompleted] = useState(0);
  const [tasks, setTasks] = useState([]);

  //Counts all pending task
  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
    settasksCompleted(tasks.filter((task) => task.completed).length);
  });

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div class="Main">
      <div class="header">
        <h1>Pending tasks ({tasksRemaining})</h1>
        <h1>Competed Tasks ({tasksCompleted})</h1>
        <h2> TO-DO ITEMS</h2>

        <div class="input">
          <CreateTask addTask={addTask} />
          {tasks.map((task, index) => (
            <Task
              class="item"
              task={task}
              index={index}
              completeTask={completeTask}
              removeTask={removeTask}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
