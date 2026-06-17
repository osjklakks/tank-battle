import { Droplets, Thermometer, FlaskConical, TestTube, Ruler, Bot, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";
import { usePond } from "../data/PondContext";

var metricIcons = { do: Droplets, temp: Thermometer, ph: FlaskConical, nh3: TestTube, waterLevel: Ruler, robot: Bot };
var metricIconCls = { do: "do", temp: "temp", ph: "ph", nh3: "nh3", waterLevel: "water", robot: "robot" };
var statusTag = function(s) { return s === "good" ? "status-green" : s === "warning" ? "status-yellow" : "status-red"; };
var statusText = function(s) { return s === "good" ? "正常" : s === "warning" ? "关注" : "异常"; };
var statusIcon = function(s) {
  if (s === "good") return <CheckCircle2 size={12} />;
  if (s === "warning") return <AlertTriangle size={12} />;
  return <AlertTriangle size={12} />;
};

var CustomTooltip = function(props) {
  var active = props.active, payload = props.payload, label = props.label;
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">{label}</div>
      {payload.map(function(p, i) {
        return <div key={i} className="chart-tooltip-row" style={{ color: p.color }}><span className="chart-tooltip-dot" style={{ background: p.color }} />{p.name}: <strong>{p.value}</strong></div>;
      })}
    </div>
  );
};

export default function Dashboard() {
  var { selectedPond, data } = usePond();
  var latestMetrics = data.metrics;
  var trends = data.trends;
  var alerts = data.alerts;

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">鱼塘数据看板</h1>
        <p className="page-desc">聚焦溶氧、水温、pH、氨氮、水位与机器人状态，快速掌握 {selectedPond} 运行全貌。</p>
      </header>

      <section className="summary-grid" aria-label="核心指标">
        {latestMetrics.map(function(item, idx) {
          var Icon = metricIcons[item.key];
          return (
            <div key={item.key} className={"summary-card status-" + item.status + " stagger-in"} style={{ animationDelay: (idx * 60) + "ms" }}>
              <div className={"summary-icon " + metricIconCls[item.key]} aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></div>
              <div className="summary-label">{item.label}</div>
              <div className="summary-value">
                {item.value}
                {item.unit ? <span className="summary-unit">{item.unit}</span> : null}
              </div>
              <div className="summary-note">
                <span className={"status-tag " + statusTag(item.status)}>{statusIcon(item.status)} {statusText(item.status)}</span>
                <span>{item.note}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="section-grid">
        <div className="section-card stagger-in" style={{ animationDelay: "280ms" }}>
          <div className="section-title"><span className="section-title-icon" /> 近 24 小时趋势</div>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="gradDO" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0369a1" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#0369a1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c2410c" stopOpacity={0.14} />
                    <stop offset="95%" stopColor="#c2410c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" tick={{ fontSize: 12, fill: "#94a3b8" }} tickMargin={8} axisLine={{ stroke: "#e2e8f0" }} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} tickMargin={8} axisLine={false} tickLine={false} />
                <ReferenceLine y={5} stroke="#dc2626" strokeDasharray="6 4" strokeOpacity={0.5} label={{ value: "安全线 5mg/L", position: "insideTopRight", fill: "#dc2626", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
                <Area type="monotone" dataKey="do" name="溶氧 (mg/L)" stroke="#0369a1" strokeWidth={2.5} fill="url(#gradDO)" dot={false} activeDot={{ r: 5, strokeWidth: 2 }} />
                <Area type="monotone" dataKey="temp" name="水温 (°C)" stroke="#c2410c" strokeWidth={2.5} fill="url(#gradTemp)" dot={false} activeDot={{ r: 5, strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="section-card stagger-in" style={{ animationDelay: "340ms" }}>
          <div className="section-title"><span className="section-title-icon" /> 告警与事件</div>
          <ul className="alert-list">
            {alerts.map(function(item) {
              return (
                <li key={item.id} className="alert-item">
                  <div>
                    <div className="alert-name">{item.pond}</div>
                    <div className="alert-meta">{item.message} · {item.time}</div>
                  </div>
                  <span className={"status-tag " + statusTag(item.level)}>{statusIcon(item.level)} {statusText(item.level)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section-grid">
        <div className="section-card stagger-in" style={{ animationDelay: "400ms" }}>
          <div className="section-title"><span className="section-title-icon" /> 全部指标</div>
          <ul className="meta-list">
            {latestMetrics.map(function(item) {
              var Icon = metricIcons[item.key];
              return (
                <li key={item.key} className="meta-chip"><Icon size={14} strokeWidth={1.8} aria-hidden="true" /><strong>{item.label}</strong> {item.value}{item.unit ? " " + item.unit : ""}</li>
              );
            })}
          </ul>
        </div>
        <div className="section-card stagger-in" style={{ animationDelay: "460ms" }}>
          <div className="section-title"><span className="section-title-icon" /> 系统说明</div>
          <p className="text-muted" style={{ margin: 0, lineHeight: 1.8 }}>
            当前页面为智氧兴渔前端原型，数据来自本地模拟。后续可对接实际传感器接口或时序数据库，实现真实数据驱动的鱼塘智能监控。
          </p>
        </div>
      </section>
    </div>
  );
}
