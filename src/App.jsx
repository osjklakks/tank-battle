import { useState, useEffect } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { BarChart3, Waves, FileText, Fish } from "lucide-react";
import { PondProvider, usePond } from "./data/PondContext";
import Cover from "./pages/Cover";
import Dashboard from "./pages/Dashboard";
import Twin from "./pages/Twin";
import Report from "./pages/Report";

function Topbar() {
  var [time, setTime] = useState(new Date());
  var { selectedPond, setSelectedPond, pondNames } = usePond();
  useEffect(function() {
    var t = setInterval(function() { setTime(new Date()); }, 1000);
    return function() { clearInterval(t); };
  }, []);
  return (
    <div className="topbar" role="banner">
      <div className="topbar-left">
        <select className="topbar-pond-select" aria-label="选择鱼塘" value={selectedPond} onChange={function(e) { setSelectedPond(e.target.value); }}>
          {pondNames.map(function(name) { return <option key={name} value={name}>{name}</option>; })}
        </select>
      </div>
      <div className="topbar-right">
        <div className="topbar-status" aria-label="系统状态在线">
          <span className="topbar-status-dot" />
          系统在线
        </div>
        <time className="topbar-time" dateTime={time.toISOString()}>
          {time.toLocaleDateString("zh-CN")} {time.toLocaleTimeString("zh-CN")}
        </time>
      </div>
    </div>
  );
}

function AppLayout() {
  return (
    <PondProvider>
      <div className="app">
        <aside className="sidebar" role="navigation" aria-label="主导航">
          <div className="brand">
            <div className="brand-icon" aria-hidden="true"><Fish size={24} /></div>
            <div>
              <div className="brand-title">智氧兴渔</div>
              <div className="brand-sub">鱼塘智能管理平台</div>
            </div>
          </div>
          <nav className="nav">
            <NavLink to="/dashboard" className={function(s) { return s.isActive ? "nav-link active" : "nav-link"; }} aria-label="鱼塘数据看板">
              <BarChart3 className="nav-icon" size={20} strokeWidth={1.8} aria-hidden="true" />
              <span>鱼塘数据</span>
            </NavLink>
            <NavLink to="/twin" className={function(s) { return s.isActive ? "nav-link active" : "nav-link"; }} aria-label="数字孚生看板">
              <Waves className="nav-icon" size={20} strokeWidth={1.8} aria-hidden="true" />
              <span>数字孚生</span>
            </NavLink>
            <NavLink to="/report" className={function(s) { return s.isActive ? "nav-link active" : "nav-link"; }} aria-label="报告生成页">
              <FileText className="nav-icon" size={20} strokeWidth={1.8} aria-hidden="true" />
              <span>报告生成</span>
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
    </PondProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/cover" element={<Cover />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}
