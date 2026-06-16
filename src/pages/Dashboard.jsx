import { useState } from "react";
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { latestMetrics, trends, alerts } from "../data/ponds";

const metricIcons = { do: "💧", temp: "🌡️", ph: "⚗️", nh3: "🧪", waterLevel: "📏", robot: "🤖" };
const metricIconCls = { do: "do", temp: "temp", ph: "ph", nh3: "nh3", waterLevel: "water", robot: "robot" };
const statusTag = (s) => s === "good" ? "status-green" : s === "warning" ? "status-yellow" : "status-red";
const statusText = (s) => s === "good" ? "正常" : s === "warning" ? "关注" : "异常";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", boxShadow: "0 4px 14px rgba(0,0,0,0.08)", fontSize: 13 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>{p.name}: <strong>{p.value}</strong></div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">鱼塘数据看板</h1>
        <p className="page-desc">聚焦溶氧、水温、pH、氨氮、水位与机器人状态，快速掌握当前鱼塘运行全貌。</p>
      </header>
      <section className="summary-grid">
        {latestMetrics.map((item) => (
          <div key={item.key} className={`summary-card status-${item.status}`}>
            <div className={`summary-icon ${metricIconCls[item.key]}`}>{metricIcons[item.key]}</div>
            <div className="summary-label">{item.label}</div>
            <div className="summary-value">
              {item.value}
              {item.unit ? <span className="summary-unit">{item.unit}</span> : null}
            </div>
            <div className="summary-note">
              <span className={`status-tag ${statusTag(item.status)}`}>{statusText(item.status)}</span>
              <span style={{ marginLeft: 8 }}>{item.note}</span>
            </div>
          </div>
        ))}
      </section>
      <section className="section-grid">
        <div className="section-card">
          <div className="section-title"><span className="section-title-icon" /> 近 24 小时趋势</div>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="gradDO" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" tick={{ fontSize: 12, fill: "#94a3b8" }} tickMargin={8} axisLine={{ stroke: "#e2e8f0" }} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} tickMargin={8} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
                <Area type="monotone" dataKey="do" name="溶氧 (mg/L)" stroke="#2563eb" strokeWidth={2.5} fill="url(#gradDO)" dot={false} />
                <Area type="monotone" dataKey="temp" name="水温 (°C)" stroke="#ea580c" strokeWidth={2.5} fill="url(#gradTemp)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="section-card">
          <div className="section-title"><span className="section-title-icon" /> 告警与事件</div>
          <ul className="alert-list">
            {alerts.map((item) => (
              <li key={item.id} className="alert-item">
                <div>
                  <div className="alert-name">{item.pond}</div>
                  <div className="alert-meta">{item.message} · {item.time}</div>
                </div>
                <span className={`status-tag ${statusTag(item.level)}`}>{statusText(item.level)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-grid">
        <div className="section-card">
          <div className="section-title"><span className="section-title-icon" /> 全部指标</div>
          <ul className="meta-list">
            {latestMetrics.map((item) => (
              <li key={item.key} className="meta-chip">
                <span>{metricIcons[item.key]}</span>
                <strong>{item.label}</strong> {item.value}{item.unit ? ` ${item.unit}` : ""}
              </li>
            ))}
          </ul>
        </div>
        <div className="section-card">
          <div className="section-title"><span className="section-title-icon" /> 系统说明</div>
          <p className="text-muted" style={{ margin: 0, lineHeight: 1.8 }}>
            当前页面为智氧兴渔前端原型，数据来自本地模拟。后续可对接实际传感器接口或时序数据库，实现真实数据驱动的鱼塘智能监控。
          </p>
        </div>
      </section>
    </div>
  );
}
