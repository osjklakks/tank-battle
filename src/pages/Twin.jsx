import { Droplets, Thermometer, Ruler, Bot } from "lucide-react";
import { usePond } from "../data/PondContext";

export default function Twin() {
  var { data } = usePond();
  var latestMetrics = data.metrics;
  var alerts = data.alerts;
  var doMetric = latestMetrics.find(function(m) { return m.key === "do"; });
  var tempMetric = latestMetrics.find(function(m) { return m.key === "temp"; });
  var waterMetric = latestMetrics.find(function(m) { return m.key === "waterLevel"; });
  var robotMetric = latestMetrics.find(function(m) { return m.key === "robot"; });
  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">数字孚生看板</h1>
        <p className="page-desc">以空间可视化方式呈现鱼塘溶氧分布、机器人巡航轨迹与低氧区标注，直觉式理解“哪里需要补氧”。</p>
      </header>
      <div className="twin-grid">
        <div className="section-card canvas-card">
          <div className="section-title"><span className="section-title-icon" /> 鱼塘空间模型</div>
          <div className="canvas" role="img" aria-label="鱼塘数字孚生模型">
            <div className="canvas-grid" />
            <div className="pond">
              <div className="robot-trail" />
              <div className="zone zone-low" style={{ left: "16%", top: "20%", width: 100, height: 100 }} />
              <div className="zone zone-low" style={{ left: "55%", top: "60%", width: 70, height: 70 }} />
              <div className="zone zone-ok" style={{ left: "48%", top: "30%", width: 120, height: 120 }} />
              <div className="zone zone-ok" style={{ left: "20%", top: "55%", width: 80, height: 80 }} />
              <div className="robot" aria-label="智能增氧机器人正在巡航" />
            </div>
          </div>
          <div className="legend" aria-label="图例">
            <span><span className="legend-dot" style={{ background: "#eab308" }} />低氧风险区</span>
            <span><span className="legend-dot" style={{ background: "#22c55e" }} />正常区域</span>
            <span><span className="legend-dot" style={{ background: "#0369a1" }} />巡航轨迹</span>
            <span><span className="legend-dot" style={{ background: "#0f172a" }} />机器人</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="twin-mini">
            <div className="summary-card status-warning">
              <div className="summary-icon do" aria-hidden="true"><Droplets size={20} strokeWidth={1.8} /></div>
              <div className="summary-label">溶氧</div>
              <div className="summary-value">{doMetric.value}<span className="summary-unit">{doMetric.unit}</span></div>
              <div className="summary-note"><span className="status-tag status-yellow">关注</span></div>
            </div>
            <div className="summary-card status-good">
              <div className="summary-icon temp" aria-hidden="true"><Thermometer size={20} strokeWidth={1.8} /></div>
              <div className="summary-label">水温</div>
              <div className="summary-value">{tempMetric.value}<span className="summary-unit">{tempMetric.unit}</span></div>
              <div className="summary-note"><span className="status-tag status-green">正常</span></div>
            </div>
            <div className="summary-card status-good">
              <div className="summary-icon water" aria-hidden="true"><Ruler size={20} strokeWidth={1.8} /></div>
              <div className="summary-label">水位</div>
              <div className="summary-value">{waterMetric.value}<span className="summary-unit">{waterMetric.unit}</span></div>
              <div className="summary-note"><span className="status-tag status-green">正常</span></div>
            </div>
            <div className="summary-card status-good">
              <div className="summary-icon robot" aria-hidden="true"><Bot size={20} strokeWidth={1.8} /></div>
              <div className="summary-label">机器人状态</div>
              <div className="summary-value" style={{ fontSize: 20 }}>{robotMetric.value}</div>
              <div className="summary-note"><span className="status-tag status-green">运行中</span></div>
            </div>
          </div>
          <div className="section-card">
            <div className="section-title"><span className="section-title-icon" /> 孚生事件流</div>
            <ul className="alert-list">
              {alerts.slice(0, 3).map(function(item) {
                return (
                  <li key={item.id} className="alert-item">
                    <div>
                      <div className="alert-name">{item.pond}</div>
                      <div className="alert-meta">{item.message} · {item.time}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
