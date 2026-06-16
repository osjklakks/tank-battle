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
          "生成溶氧趋势分析",
          "标注低氧事件与补氧响应",
          "统计机器人补氧次数",
          "输出运维建议",
        ],
        note,
      });
      setLoading(false);
    }, 900);
  };

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">报告生成</h1>
        <p className="page-desc">
          根据选定鱼塘和时间范围生成巡塘/运维报告，适合用于日报、阶段性汇报或事件复盘。
        </p>
      </header>

      <div className="report-grid">
        <div className="section-card">
          <div className="section-title">报告参数</div>
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

          <div style={{ marginTop: 12 }}>
            <button className="primary-btn" disabled={loading} onClick={handleGenerate}>
              {loading ? "生成中..." : "生成报告"}
            </button>
          </div>

          <p className="small-note" style={{ marginTop: 10 }}>
            当前为前端演示模式，生成内容由本地模拟逻辑输出，后续可对接真实数据源与导出接口。
          </p>
        </div>

        <div className="section-card">
          <div className="section-title">报告预览</div>
          {!report ? (
            <div className="report-summary text-muted">
              尚未生成报告。请在左侧选择参数后点击“生成报告”。
            </div>
          ) : (
            <div className="report-summary">
              <div><strong>鱼塘：</strong>{report.pond}</div>
              <div><strong>日期：</strong>{report.date}</div>
              <div><strong>范围：</strong>{report.range}</div>
              <div style={{ marginTop: 10 }}>{report.summary}</div>

              <div style={{ marginTop: 12 }}>
                <div className="small-note" style={{ marginBottom: 8 }}>输出内容包括：</div>
                <ul className="meta-list">
                  {report.actions.map((item) => (
                    <li key={item} className="meta-chip">{item}</li>
                  ))}
                </ul>
              </div>

              {report.note ? (
                <div style={{ marginTop: 12 }} className="small-note">
                  备注：{report.note}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
