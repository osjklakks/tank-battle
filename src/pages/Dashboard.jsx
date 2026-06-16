import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { latestMetrics, trends, alerts } from "../data/ponds";

const statusClass = (status) => {
  if (status === "good") return "status-green";
  if (status === "warning") return "status-yellow";
  return "status-red";
};

const statusText = (status) => {
  if (status === "good") return "正常";
  if (status === "warning") return "关注";
  return "异常";
};

export default function Dashboard() {
  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">鱼塘数据看板</h1>
        <p className="page-desc">
          聚焦溶氧、水温、pH、氨氮、水位与机器人状态，用于快速掌握当前鱼塘运行情况。
        </p>
      </header>

      <section className="summary-grid">
        {latestMetrics.slice(0, 4).map((item) => (
          <div key={item.key} className="summary-card">
            <div className="summary-label">{item.label}</div>
            <div className="summary-value">
              {item.value}
              {item.unit ? <span style={{ fontSize: 12, marginLeft: 4 }}>{item.unit}</span> : null}
            </div>
            <div className="summary-note">{item.note}</div>
          </div>
        ))}
      </section>

      <section className="section-grid">
        <div className="section-card">
          <div className="section-title">近 24 小时趋势</div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" tickMargin={8} />
                <YAxis tickMargin={8} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="do" name="溶氧(mg/L)" stroke="#2563eb" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="temp" name="水温(°C)" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="section-card">
          <div className="section-title">告警与事件</div>
          <ul className="alert-list">
            {alerts.map((item) => (
              <li key={item.id} className="alert-item">
                <div>
                  <div className="alert-name">{item.pond}</div>
                  <div className="alert-meta">{item.message} · {item.time}</div>
                </div>
                <span className={`status-tag ${statusClass(item.level)}`}>
                  {statusText(item.level)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-grid">
        <div className="section-card">
          <div className="section-title">重点指标</div>
          <ul className="meta-list">
            {latestMetrics.map((item) => (
              <li key={item.key} className="meta-chip">
                <strong>{item.label}</strong> {item.value}{item.unit ? ` ${item.unit}` : ""}
              </li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <div className="section-title">看板说明</div>
          <p className="text-muted" style={{ margin: 0 }}>
            当前页面为前端原型演示，数据来自本地模拟数据，便于验证信息层级、告警表达与趋势展示。后续可替换为实际接口或时序数据库数据。
          </p>
        </div>
      </section>
    </div>
  );
}
