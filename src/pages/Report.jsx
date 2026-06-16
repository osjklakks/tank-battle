import { useState } from "react";

export default function Report() {
  const [pond, setPond] = useState("东塘 A");
  const [date, setDate] = useState("2026-06-16");
  const [range, setRange] = useState("24h");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setReport({
        pond,
        date,
        range,
        summary:
          "本时段内，鱼塘整体运行平稳，但局部区域在投喂后 2 小时内出现溶氧下降趋势。机器人已针对低氧点进行定点喷泉补氧，补氧后溶氧恢复至安全区间。建议继续关注夜间溶氧波动和氨氮变化。",
        actions: [
          "溶氧趋势分析",
          "低氧事件标注",
          "机器人补氧统计",
          "运维建议输出",
        ],
        robotRuns: 3,
        alertCount: 2,
        note,
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">报告生成</h1>
        <p className="page-desc">根据选定鱼塘和时间范围生成巡塘/运维报告，适合用于日报、阶段性汇报或事件复盘。</p>
      </header>
      <div className="report-grid">
        <div className="section-card">
          <div className="section-title"><span className="section-title-icon" /> 报告参数</div>
          <div className="form-grid">
            <div className="field">
              <label className="field-label">鱼塘</label>
              <select className="select" value={pond} onChange={(e) => setPond(e.target.value)}>
                <option>东塘 A</option>
                <option>南塘 B</option>
                <option>西塘 C</option>
                <option>北塘 D</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">日期</label>
              <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="field">
              <label className="field-label">时间范围</label>
              <select className="select" value={range} onChange={(e) => setRange(e.target.value)}>
                <option value="24h">近 24 小时</option>
                <option value="3d">近 3 天</option>
                <option value="7d">近 7 天</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">报告用途</label>
              <input className="input" placeholder="日报 / 周报 / 事件复盘" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="primary-btn" disabled={loading} onClick={handleGenerate}>
              {loading ? "生成中..." : "生成报告"}
            </button>
          </div>
          <p className="small-note" style={{ marginTop: 12 }}>当前为前端演示模式，生成内容由本地模拟逻辑输出，后续可对接真实数据源。</p>
        </div>
        <div className="section-card">
          <div className="section-title"><span className="section-title-icon" /> 报告预览</div>
          {!report ? (
            <div className="report-placeholder">
              <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
              尚未生成报告。请在左侧选择参数后点击“生成报告”。
            </div>
          ) : (
            <div className="report-summary">
              <div className="report-header">
                <div className="report-header-icon">📋</div>
                <div className="report-header-text">
                  <h3>{report.pond} 巡塘报告</h3>
                  <p>{report.date} · {report.range === "24h" ? "近 24 小时" : report.range === "3d" ? "近 3 天" : "近 7 天"}</p>
                </div>
              </div>
              <div className="report-body">
                <div className="report-row">
                  <div className="report-field"><strong>巡塘鱼塘：</strong>{report.pond}</div>
                  <div className="report-field"><strong>机器人补氧：</strong>{report.robotRuns} 次</div>
                  <div className="report-field"><strong>告警事件：</strong>{report.alertCount} 条</div>
                </div>
                <div className="report-section-label">综合分析</div>
                <p style={{ margin: 0, lineHeight: 1.8 }}>{report.summary}</p>
                <div className="report-section-label">输出内容</div>
                <ul className="meta-list">
                  {report.actions.map((item) => (
                    <li key={item} className="meta-chip">✅ {item}</li>
                  ))}
                </ul>
                {report.note ? (
                  <div style={{ marginTop: 16 }} className="small-note"><strong>备注：</strong>{report.note}</div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
