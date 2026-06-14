import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <nav style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            padding: "0 24px",
        }}>
            <div style={{
                maxWidth: "900px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "56px",
            }}>
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                    <div style={{
                        width: "28px", height: "28px",
                        backgroundColor: "#000",
                        borderRadius: "8px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 3.5h10M2 7h10M2 10.5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.3px" }}>
                        Taskly
                    </span>
                </Link>
                <Link
                    to="/"
                    style={{
                        padding: "6px 14px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: 500,
                        textDecoration: "none",
                        backgroundColor: location.pathname === "/" ? "#000" : "transparent",
                        color: location.pathname === "/" ? "#fff" : "#6b7280",
                        transition: "all 0.15s ease",
                    }}
                >
                    All Tasks
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;