import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addTask = async () => {
        if (!title.trim()) {
            alert("Please enter task title");
            return;
        }

        try {
            if (editingId) {
                const currentTask = tasks.find(
                    (t) => t.id === editingId
                );

                await api.put(`/tasks/${editingId}`, {
                    title,
                    description,
                    completed: currentTask.completed,
                    due_date: dueDate || null,
                    priority,
                });

                setEditingId(null);
            } else {
                await api.post("/tasks", {
                    title,
                    description,
                    due_date: dueDate || null,
                    priority,
                });
            }

            setTitle("");
            setDescription("");
            setDueDate("");
            setPriority("Medium");

            fetchTasks();
        } catch (err) {
            console.log(err);
        }
    };

    const editTask = (task) => {
        setEditingId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date || "");
        setPriority(task.priority || "Medium");
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            console.log(err);
        }
    };

    const toggleCompleted = async (task) => {
        try {
            await api.put(`/tasks/${task.id}`, {
                title: task.title,
                description: task.description,
                completed: !task.completed,
                due_date: task.due_date,
                priority: task.priority,
            });

            fetchTasks();
        } catch (err) {
            console.log(err);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());

        if (filter === "completed")
            return matchesSearch && task.completed;

        if (filter === "pending")
            return matchesSearch && !task.completed;

        return matchesSearch;
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
        (t) => t.completed
    ).length;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <div className="container">

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div>
                    <h2 style={{ color: "#4CAF50" }}>
                        👋 Welcome!
                    </h2>

                    <h1>Todo Dashboard</h1>
                </div>

                <button
                    className="add-btn"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "☀ Light" : "🌙 Dark"}
                </button>
            </div>

            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                    setDueDate(e.target.value)
                }
            />

            <select
                value={priority}
                onChange={(e) =>
                    setPriority(e.target.value)
                }
            >
                <option value="High">🔴 High</option>
                <option value="Medium">
                    🟡 Medium
                </option>
                <option value="Low">🟢 Low</option>
            </select>

            <button
                className="add-btn"
                onClick={addTask}
            >
                {editingId
                    ? "Update Task"
                    : "Add Task"}
            </button>

            <input
                type="text"
                placeholder="🔍 Search Tasks..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    margin: "20px 0",
                }}
            >
                <button
                    className="add-btn"
                    onClick={() =>
                        setFilter("all")
                    }
                >
                    All
                </button>

                <button
                    className="edit-btn"
                    onClick={() =>
                        setFilter("completed")
                    }
                >
                    Completed
                </button>

                <button
                    className="delete-btn"
                    onClick={() =>
                        setFilter("pending")
                    }
                >
                    Pending
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    background: "#f5f5f5",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    fontWeight: "bold",
                }}
            >
                <div>📋 {totalTasks}</div>
                <div>✅ {completedTasks}</div>
                <div>⏳ {pendingTasks}</div>
            </div>
                        {filteredTasks.length === 0 ? (
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        fontSize: "18px",
                    }}
                >
                    No Tasks Found
                </p>
            ) : (
                filteredTasks.map((task) => (
                    <div className="task-card" key={task.id}>
                        <div style={{ marginBottom: "10px" }}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleCompleted(task)}
                            />{" "}
                            Completed
                        </div>

                        <h3
                            style={{
                                textDecoration: task.completed
                                    ? "line-through"
                                    : "none",
                                color: task.completed
                                    ? "gray"
                                    : "black",
                            }}
                        >
                            {task.title}
                        </h3>

                        <p>{task.description}</p>

                        <p>
                            <strong>📅 Due Date:</strong>{" "}
                            {task.due_date
                                ? new Date(task.due_date).toLocaleDateString()
                                : "Not Set"}
                        </p>

                        <p>
                            <strong>⭐ Priority:</strong>{" "}
                            <span
                                style={{
                                    color:
                                        task.priority === "High"
                                            ? "red"
                                            : task.priority === "Medium"
                                            ? "orange"
                                            : "green",
                                    fontWeight: "bold",
                                }}
                            >
                                {task.priority}
                            </span>
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "15px",
                            }}
                        >
                            <button
                                className="edit-btn"
                                onClick={() => editTask(task)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}

            <div
                style={{
                    textAlign: "center",
                    marginTop: "30px",
                }}
            >
                <button
                    onClick={logout}
                    style={{
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "12px 25px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;