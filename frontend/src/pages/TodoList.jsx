import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";

const API = "http://localhost:5000/api/todos";
const FILTERS = ["All", "Active", "Completed"];
const PRIORITIES = ["All", "High", "Medium", "Low"];

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [form, setForm] = useState({ title: "", description: "", dueDate: "", priority: "Medium" });
    const [formOpen, setFormOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const fetchTodos = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setTodos(data);
        } catch (err) {
            console.error("Failed to fetch todos", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTodos(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        setSubmitting(true);
        try {
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const newTodo = await res.json();
            setTodos((prev) => [newTodo, ...prev]);
            setForm({ title: "", description: "", dueDate: "", priority: "Medium" });
            setFormOpen(false);
        } catch (err) {
            console.error("Failed to create todo", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggle = async (todo) => {
        try {
            const res = await fetch(`${API}/${todo.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isCompleted: !todo.isCompleted }),
            });
            const updated = await res.json();
            setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        } catch (err) {
            console.error("Failed to toggle todo", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            setTodos((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error("Failed to delete todo", err);
        }
    };

    const filteredTodos = todos
        .filter((t) => {
            if (filter === "Active") return !t.isCompleted;
            if (filter === "Completed") return t.isCompleted;
            return true;
        })
        .filter((t) => priorityFilter === "All" ? true : t.priority === priorityFilter);

    const stats = {
        total: todos.length,
        completed: todos.filter((t) => t.isCompleted).length,
        active: todos.filter((t) => !t.isCompleted).length,
    };

    const inputStyle = {
        width: "100%",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        padding: "12px 16px",
        fontSize: "14px",
        color: "#1d1d1f",
        border: "1px solid transparent",
        outline: "none",
        transition: "all 0.2s ease",
        fontFamily: "inherit",
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f7" }}>
            <Navbar />
            <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>

                <div style={{ marginBottom: "32px" }}>
                    <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.5px", margin: 0 }}>
                        My Tasks
                    </h1>
                    <p style={{ marginTop: "4px", fontSize: "13px", color: "#9ca3af" }}>
                        {stats.active} remaining · {stats.completed} completed
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                    marginBottom: "32px",
                }}>
                    {[
                        { label: "Total", value: stats.total, color: "#1d1d1f" },
                        { label: "Active", value: stats.active, color: "#2563eb" },
                        { label: "Completed", value: stats.completed, color: "#16a34a" },
                    ].map((stat) => (
                        <div key={stat.label} style={{
                            backgroundColor: "#fff",
                            borderRadius: "16px",
                            padding: "20px",
                            border: "1px solid rgba(0,0,0,0.06)",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                        }}>
                            <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", margin: 0 }}>
                                {stat.label}
                            </p>
                            <p style={{ fontSize: "32px", fontWeight: 700, color: stat.color, marginTop: "4px", lineHeight: 1 }}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    gap: "12px",
                    flexWrap: "wrap",
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        padding: "4px",
                        border: "1px solid rgba(0,0,0,0.06)",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}>
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    padding: "6px 14px",
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                    backgroundColor: filter === f ? "#000" : "transparent",
                                    color: filter === f ? "#fff" : "#6b7280",
                                    fontFamily: "inherit",
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            style={{
                                fontSize: "13px",
                                color: "#6b7280",
                                backgroundColor: "#fff",
                                border: "1px solid rgba(0,0,0,0.06)",
                                borderRadius: "12px",
                                padding: "8px 14px",
                                outline: "none",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                            }}
                        >
                            {PRIORITIES.map((p) => (
                                <option key={p} value={p}>{p === "All" ? "All Priorities" : p}</option>
                            ))}
                        </select>

                        <button
                            onClick={() => setFormOpen((prev) => !prev)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                backgroundColor: "#000",
                                color: "#fff",
                                fontSize: "13px",
                                fontWeight: 500,
                                padding: "8px 18px",
                                borderRadius: "12px",
                                border: "none",
                                cursor: "pointer",
                                transition: "background 0.15s ease",
                                fontFamily: "inherit",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#333"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#000"; }}
                        >
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                            New Task
                        </button>
                    </div>
                </div>

                {formOpen && (
                    <form
                        onSubmit={handleCreate}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "16px",
                            padding: "24px",
                            marginBottom: "20px",
                            border: "1px solid rgba(0,0,0,0.06)",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                        }}
                    >
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1d1d1f", margin: 0 }}>Create New Task</p>
                        <input
                            type="text"
                            placeholder="Task title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            style={inputStyle}
                            required
                        />
                        <textarea
                            placeholder="Description (optional)"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            rows={3}
                            style={{ ...inputStyle, resize: "none", lineHeight: "1.5" }}
                        />
                        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                            <input
                                type="date"
                                value={form.dueDate}
                                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                                style={{ ...inputStyle, flex: 1, minWidth: "140px" }}
                            />
                            <select
                                value={form.priority}
                                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                                style={{ ...inputStyle, flex: 1, minWidth: "140px", cursor: "pointer" }}
                            >
                                <option value="High">High Priority</option>
                                <option value="Medium">Medium Priority</option>
                                <option value="Low">Low Priority</option>
                            </select>
                        </div>
                        <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    flex: 1,
                                    backgroundColor: "#000",
                                    color: "#fff",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    padding: "12px",
                                    borderRadius: "12px",
                                    border: "none",
                                    cursor: submitting ? "not-allowed" : "pointer",
                                    opacity: submitting ? 0.5 : 1,
                                    fontFamily: "inherit",
                                    transition: "background 0.15s ease",
                                }}
                            >
                                {submitting ? "Creating..." : "Create Task"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormOpen(false)}
                                style={{
                                    flex: 1,
                                    backgroundColor: "#f3f4f6",
                                    color: "#6b7280",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    padding: "12px",
                                    borderRadius: "12px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    transition: "background 0.15s ease",
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {loading ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} style={{
                                backgroundColor: "#fff",
                                borderRadius: "16px",
                                padding: "20px",
                                border: "1px solid rgba(0,0,0,0.06)",
                                animation: "pulse 1.5s ease-in-out infinite",
                            }}>
                                <div style={{ display: "flex", gap: "14px" }}>
                                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#f3f4f6", flexShrink: 0 }}/>
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <div style={{ height: "14px", backgroundColor: "#f3f4f6", borderRadius: "8px", width: "60%" }}/>
                                        <div style={{ height: "12px", backgroundColor: "#f3f4f6", borderRadius: "8px", width: "40%" }}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredTodos.length === 0 ? (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "80px 24px",
                        textAlign: "center",
                    }}>
                        <div style={{
                            width: "52px", height: "52px",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "16px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: "16px",
                        }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", margin: 0 }}>No tasks found</p>
                        <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>Create a new task to get started</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {filteredTodos.map((todo) => (
                            <TodoCard key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </main>

            <style>{`
                @media (max-width: 600px) {
                    main { padding: 24px 16px !important; }
                    h1 { font-size: 22px !important; }
                    .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
                }
            `}</style>
        </div>
    );
}

export default TodoList;