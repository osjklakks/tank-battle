import { latestMetrics, alerts } from "../data/ponds";

export default function Twin() {
  const doMetric = latestMetrics.find((m) => m.key === "do");
  const tempMetric = latestMetrics.find((m) => m.key === "temp");
  const waterMetric = latestMetrics.find((m) => m.key === "waterLevel");
  const robotMetric = latestMetrics.find((m) => m.key === "robot");

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">数字孪生看板</h1>
        <p className="page-desc">
          用更直观的方式查看鱼塘空间分布、机器人巡航轨迹和重点区域状态，便于理解“哪里需要补氧”。
        </p>
      </header>

      <div className="twin-grid">
        <div className="section-card canvas-card">
          <div className="section-title">鱼塘模型示意</div>
          <div className="canvas">
            <div className="pond">
              <div className="zone zone-low" style={{ left: "18%", top: "24%", width: 90, height: 90 }} />
              <div className="zone zone-ok" style={{ left: "52%", top: "40%", width: 110, height: 110 }} />
              <div className="robot" />
            </div>
          </div>

          <div className="legend">
            <span><span className="legend-dot" style={{ background: "#facc15" }} />低氧区</span>
            <span><span className="legend-dot" style={{ background: "#22c55e" }} />正常区</span>
            <span><span className="legend-dot" style={{ background: "#0f172a" }} />机器人</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="twin-mini">
            <div className="section-card">
              <div className="summary-label">溶氧</div>
              <div className="summary-value">{doMetric.value}<span style={{ fontSize: 12, marginLeft: 4 }}>{doMetric.unit}</span></div>
              <div className="summary-note">{doMetric.note}</div>
            </div>
            <div className="section-card">
              <div className="summary-label">水温</div>
              <div className="summary-value">{tempMetric.value}<span style={{ fontSize: 12, marginLeft: 4 }}>{tempMetric.unit}</span></div>
              <div className="summary-note">{tempMetric.note}</div>
            </div>
            <div className="section-card">
              <div className="summary-label">水位</div>
              <div className="summary-value">{waterMetric.value}<span style={{ fontSize: 12, marginLeft: 4 }}>{waterMetric.unit}</span></div>
              <div className="summary-note">{waterMetric.note}</div>
            </div>
            <div className="section-card">
              <div className="summary-label">机器人状态</div>
              <div className="summary-value">{robotMetric.value}</div>
              <div className="summary-note">{robotMetric.note}</div>
            </div>
          </div>

          <div className="section-card">
            <div className="section-title">孪生事件流</div>
            <ul className="alert-list">
              {alerts.slice(0, 3).map((item) => (
                <li key={item.id} className="alert-item">
                  <div>
                    <div className="alert-name">{item.pond}</div>
                    <div className="alert-meta">{item.message} · {item.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
