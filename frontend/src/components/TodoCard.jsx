import { useNavigate } from "react-router-dom";

const PRIORITY_COLORS = {
    High: { bg: "#fff1f2", color: "#e11d48", border: "#fecdd3" },
    Medium: { bg: "#fefce8", color: "#ca8a04", border: "#fef08a" },
    Low: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
};

function TodoCard({ todo, onToggle, onDelete }) {
    const navigate = useNavigate();
    const priority = PRIORITY_COLORS[todo.priority] || PRIORITY_COLORS.Medium;

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return (
        <div
            style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "18px 20px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
                opacity: todo.isCompleted ? 0.6 : 1,
                cursor: "default",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <button
                    onClick={() => onToggle(todo)}
                    style={{
                        marginTop: "2px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: todo.isCompleted ? "2px solid #000" : "2px solid #d1d5db",
                        backgroundColor: todo.isCompleted ? "#000" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        padding: 0,
                    }}
                >
                    {todo.isCompleted && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </button>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                        <h3
                            onClick={() => navigate(`/todo?id=${todo.id}`)}
                            style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: todo.isCompleted ? "#9ca3af" : "#1d1d1f",
                                textDecoration: todo.isCompleted ? "line-through" : "none",
                                cursor: "pointer",
                                lineHeight: "1.4",
                                transition: "color 0.15s ease",
                                margin: 0,
                            }}
                            onMouseEnter={(e) => { if (!todo.isCompleted) e.target.style.color = "#2563eb"; }}
                            onMouseLeave={(e) => { if (!todo.isCompleted) e.target.style.color = "#1d1d1f"; }}
                        >
                            {todo.title}
                        </h3>
                        <span style={{
                            flexShrink: 0,
                            fontSize: "11px",
                            fontWeight: 600,
                            padding: "3px 10px",
                            borderRadius: "999px",
                            backgroundColor: priority.bg,
                            color: priority.color,
                            border: `1px solid ${priority.border}`,
                            letterSpacing: "0.1px",
                        }}>
                            {todo.priority}
                        </span>
                    </div>

                    {todo.description && (
                        <p style={{
                            marginTop: "5px",
                            fontSize: "12px",
                            color: "#9ca3af",
                            lineHeight: "1.5",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}>
                            {todo.description}
                        </p>
                    )}

                    <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {todo.dueDate ? (
                            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#9ca3af" }}>
                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                    <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                                    <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                </svg>
                                {formatDate(todo.dueDate)}
                            </span>
                        ) : <span />}
                        <button
                            onClick={() => onDelete(todo.id)}
                            style={{
                                fontSize: "11px",
                                fontWeight: 500,
                                color: "#d1d5db",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "2px 4px",
                                borderRadius: "4px",
                                transition: "color 0.15s ease",
                            }}
                            onMouseEnter={(e) => { e.target.style.color = "#ef4444"; }}
                            onMouseLeave={(e) => { e.target.style.color = "#d1d5db"; }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoCard;