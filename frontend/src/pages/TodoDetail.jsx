import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API = "https://ziptrrip-todo-backend.onrender.com/api/todos";

const PRIORITY_COLORS = {
    High: { bg: "#fff1f2", color: "#e11d48", border: "#fecdd3" },
    Medium: { bg: "#fefce8", color: "#ca8a04", border: "#fef08a" },
    Low: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
};

function TodoDetail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get("id");

    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({});
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) { navigate("/"); return; }
        const fetchTodo = async () => {
            try {
                const res = await fetch(`${API}/${id}`);
                if (!res.ok) { setNotFound(true); return; }
                const data = await res.json();
                setTodo(data);
                setForm({
                    title: data.title,
                    description: data.description,
                    dueDate: data.dueDate ? data.dueDate.split("T")[0] : "",
                    priority: data.priority,
                });
            } catch (err) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchTodo();
    }, [id, navigate]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const updated = await res.json();
            setTodo(updated);
            setEditing(false);
        } catch (err) {
            console.error("Failed to update todo", err);
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async () => {
        try {
            const res = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isCompleted: !todo.isCompleted }),
            });
            const updated = await res.json();
            setTodo(updated);
        } catch (err) {
            console.error("Failed to toggle todo", err);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            navigate("/");
        } catch (err) {
            console.error("Failed to delete todo", err);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "No due date set";
        return new Date(dateStr).toLocaleDateString("en-US", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
        });
    };

    const formatCreatedAt = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
            hour: "2-digit", minute: "2-digit",
        });
    };

    const inputStyle = {
        width: "100%",
        backgroundColor: "#f9fafb",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "14px",
        color: "#1d1d1f",
        border: "1px solid #e5e7eb",
        outline: "none",
        fontFamily: "inherit",
        transition: "border-color 0.15s ease",
        boxSizing: "border-box",
    };

    const metaLabelStyle = {
        fontSize: "11px",
        fontWeight: 600,
        color: "#9ca3af",
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        margin: 0,
        marginBottom: "6px",
    };

    if (loading) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f7" }}>
                <Navbar />
                <main style={{ maxWidth: "680px", margin: "0 auto", padding: "40px 24px" }}>
                    <div style={{
                        backgroundColor: "#fff", borderRadius: "20px", padding: "32px",
                        border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}>
                        {[["70%", "24px"], ["50%", "16px"], ["60%", "16px"]].map(([w, h], i) => (
                            <div key={i} style={{
                                height: h, backgroundColor: "#f3f4f6", borderRadius: "8px",
                                width: w, marginBottom: "16px",
                            }}/>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (notFound) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f7" }}>
                <Navbar />
                <main style={{ maxWidth: "680px", margin: "0 auto", padding: "40px 24px", textAlign: "center" }}>
                    <div style={{
                        backgroundColor: "#fff", borderRadius: "20px", padding: "64px 32px",
                        border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}>
                        <p style={{ fontSize: "48px", fontWeight: 700, color: "#1d1d1f", margin: 0 }}>404</p>
                        <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>Task not found</p>
                        <button
                            onClick={() => navigate("/")}
                            style={{
                                marginTop: "24px", backgroundColor: "#000", color: "#fff",
                                fontSize: "13px", fontWeight: 500, padding: "10px 24px",
                                borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "inherit",
                            }}
                        >
                            Back to Tasks
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const priority = PRIORITY_COLORS[todo.priority] || PRIORITY_COLORS.Medium;

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f7" }}>
            <Navbar />
            <main style={{ maxWidth: "680px", margin: "0 auto", padding: "40px 24px" }}>

                <button
                    onClick={() => navigate("/")}
                    style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        fontSize: "13px", color: "#9ca3af", fontWeight: 500,
                        background: "none", border: "none", cursor: "pointer",
                        marginBottom: "24px", padding: 0, fontFamily: "inherit",
                        transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#1d1d1f"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    All Tasks
                </button>

                <div style={{
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                }}>
                    <div style={{ padding: "32px" }}>

                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "28px" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", flex: 1 }}>
                                <button
                                    onClick={handleToggle}
                                    style={{
                                        marginTop: "4px",
                                        width: "22px", height: "22px",
                                        borderRadius: "50%",
                                        border: todo.isCompleted ? "2px solid #000" : "2px solid #d1d5db",
                                        backgroundColor: todo.isCompleted ? "#000" : "transparent",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0, cursor: "pointer", padding: 0,
                                        transition: "all 0.15s ease",
                                    }}
                                >
                                    {todo.isCompleted && (
                                        <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                                            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </button>
                                <div style={{ flex: 1 }}>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            style={{ ...inputStyle, fontSize: "20px", fontWeight: 700, padding: "8px 12px" }}
                                        />
                                    ) : (
                                        <h1 style={{
                                            fontSize: "20px", fontWeight: 700,
                                            color: todo.isCompleted ? "#9ca3af" : "#1d1d1f",
                                            textDecoration: todo.isCompleted ? "line-through" : "none",
                                            letterSpacing: "-0.3px", lineHeight: "1.3", margin: 0,
                                        }}>
                                            {todo.title}
                                        </h1>
                                    )}
                                </div>
                            </div>
                            <span style={{
                                flexShrink: 0,
                                fontSize: "11px", fontWeight: 600,
                                padding: "4px 12px", borderRadius: "999px",
                                backgroundColor: priority.bg,
                                color: priority.color,
                                border: `1px solid ${priority.border}`,
                            }}>
                                {todo.priority}
                            </span>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <p style={metaLabelStyle}>Description</p>
                            {editing ? (
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={4}
                                    placeholder="Add a description..."
                                    style={{ ...inputStyle, resize: "none", lineHeight: "1.6" }}
                                />
                            ) : (
                                <p style={{
                                    fontSize: "14px", color: todo.description ? "#4b5563" : "#d1d5db",
                                    lineHeight: "1.7", margin: 0,
                                    fontStyle: todo.description ? "normal" : "italic",
                                }}>
                                    {todo.description || "No description added"}
                                </p>
                            )}
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px",
                            marginBottom: "16px",
                        }}>
                            <div style={{ backgroundColor: "#f9fafb", borderRadius: "14px", padding: "16px" }}>
                                <p style={metaLabelStyle}>Due Date</p>
                                {editing ? (
                                    <input
                                        type="date"
                                        value={form.dueDate}
                                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                                        style={{ ...inputStyle, padding: "8px 12px" }}
                                    />
                                ) : (
                                    <p style={{ fontSize: "13px", fontWeight: 500, color: "#374151", margin: 0 }}>
                                        {formatDate(todo.dueDate)}
                                    </p>
                                )}
                            </div>
                            <div style={{ backgroundColor: "#f9fafb", borderRadius: "14px", padding: "16px" }}>
                                <p style={metaLabelStyle}>Priority</p>
                                {editing ? (
                                    <select
                                        value={form.priority}
                                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                                        style={{ ...inputStyle, padding: "8px 12px", cursor: "pointer" }}
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                ) : (
                                    <p style={{ fontSize: "13px", fontWeight: 500, color: "#374151", margin: 0 }}>
                                        {todo.priority}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div style={{ backgroundColor: "#f9fafb", borderRadius: "14px", padding: "16px", marginBottom: "28px" }}>
                            <p style={metaLabelStyle}>Created At</p>
                            <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                                {formatCreatedAt(todo.createdAt)}
                            </p>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            {editing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        style={{
                                            flex: 1, backgroundColor: "#000", color: "#fff",
                                            fontSize: "13px", fontWeight: 500, padding: "12px",
                                            borderRadius: "12px", border: "none", cursor: saving ? "not-allowed" : "pointer",
                                            opacity: saving ? 0.5 : 1, fontFamily: "inherit", transition: "background 0.15s ease",
                                        }}
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>
                                    <button
                                        onClick={() => setEditing(false)}
                                        style={{
                                            flex: 1, backgroundColor: "#f3f4f6", color: "#6b7280",
                                            fontSize: "13px", fontWeight: 500, padding: "12px",
                                            borderRadius: "12px", border: "none", cursor: "pointer",
                                            fontFamily: "inherit", transition: "background 0.15s ease",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setEditing(true)}
                                        style={{
                                            flex: 1, backgroundColor: "#000", color: "#fff",
                                            fontSize: "13px", fontWeight: 500, padding: "12px",
                                            borderRadius: "12px", border: "none", cursor: "pointer",
                                            fontFamily: "inherit", transition: "background 0.15s ease",
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#333"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#000"; }}
                                    >
                                        Edit Task
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        style={{
                                            flex: 1, backgroundColor: "#fff1f2", color: "#e11d48",
                                            fontSize: "13px", fontWeight: 500, padding: "12px",
                                            borderRadius: "12px", border: "1px solid #fecdd3",
                                            cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s ease",
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ffe4e6"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff1f2"; }}
                                    >
                                        Delete Task
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TodoDetail;