import { useState, useEffect } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Twin from "./pages/Twin";
import Report from "./pages/Report";

function Topbar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="topbar">
      <div className="topbar-left">
        <select className="topbar-pond-select">
          <option>东塘 A</option>
          <option>南塘 B</option>
          <option>西塘 C</option>
          <option>北塘 D</option>
        </select>
      </div>
      <div className="topbar-right">
        <div className="topbar-status"><span className="topbar-status-dot" /> 系统在线</div>
        <div className="topbar-time">{time.toLocaleDateString("zh-CN")} {time.toLocaleTimeString("zh-CN")}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🐟</div>
          <div>
            <div className="brand-title">智氧兴渔</div>
            <div className="brand-sub">鱼塘智能管理平台</div>
          </div>
        </div>
        <nav className="nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <span className="nav-icon">📊</span> 鱼塘数据
          </NavLink>
          <NavLink to="/twin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <span className="nav-icon">🌊</span> 数字孚生
          </NavLink>
          <NavLink to="/report" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <span className="nav-icon">📋</span> 报告生成
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="footer-tag">智氧兴渔 v1.0</div>
          <div className="footer-note">喷泉式智能增氧机器人管理平台</div>
        </div>
      </aside>
      <main className="main">
        <Topbar />
        <div className="main-inner">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/twin" element={<Twin />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
