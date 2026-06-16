import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Twin from "./pages/Twin";
import Report from "./pages/Report";

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🐟</div>
          <div>
            <div className="brand-title">智氧兴渔</div>
            <div className="brand-sub">鱼塘智能管理前端</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            <span className="nav-dot" /> 鱼塘数据
          </NavLink>
          <NavLink to="/twin" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            <span className="nav-dot" /> 数字孪生
          </NavLink>
          <NavLink to="/report" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            <span className="nav-dot" /> 报告生成
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="footer-tag">原型演示</div>
          <div className="footer-note">用于展示鱼塘监控、数字孪生与报告能力</div>
        </div>
      </aside>

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/twin" element={<Twin />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </main>
    </div>
  );
}
