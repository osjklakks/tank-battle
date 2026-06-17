import { useNavigate } from "react-router-dom";
import { ArrowRight, Droplets, Bot, BarChart3, Shield } from "lucide-react";

export default function Cover() {
  const navigate = useNavigate();

  return (
    <div className="cover">
      <div className="cover-bg">
        <div className="cover-wave cover-wave-1" />
        <div className="cover-wave cover-wave-2" />
        <div className="cover-wave cover-wave-3" />
        <div className="cover-particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="cover-particle" style={{
              left: `${5 + (i * 5.2) % 90}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 4) * 2}s`,
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
            }} />
          ))}
        </div>
      </div>

      <div className="cover-content">
        <div className="cover-badge">
          <Droplets size={14} strokeWidth={2} />
          <span>喷泉式智能增氧机器人</span>
        </div>

        <h1 className="cover-title">
          <span className="cover-title-main">智氧兴渔</span>
          <span className="cover-title-sub">鱼塘智能管理平台</span>
        </h1>

        <p className="cover-desc">
          基于氧场建模与低氧风险评估，实现巡航检测、低氧识别、定点喷泉补氧与数据回传的全链路智能管控。
        </p>

        <button className="cover-cta" onClick={() => navigate("/dashboard")} aria-label="进入管理平台">
          <span>进入管理平台</span>
          <ArrowRight size={18} strokeWidth={2} />
        </button>

        <div className="cover-stats">
          <div className="cover-stat">
            <div className="cover-stat-icon"><Droplets size={18} strokeWidth={1.8} /></div>
            <div className="cover-stat-value">5.6 <small>mg/L</small></div>
            <div className="cover-stat-label">实时溶氧</div>
          </div>
          <div className="cover-stat-divider" />
          <div className="cover-stat">
            <div className="cover-stat-icon"><Bot size={18} strokeWidth={1.8} /></div>
            <div className="cover-stat-value">3 <small>台</small></div>
            <div className="cover-stat-label">机器人在线</div>
          </div>
          <div className="cover-stat-divider" />
          <div className="cover-stat">
            <div className="cover-stat-icon"><BarChart3 size={18} strokeWidth={1.8} /></div>
            <div className="cover-stat-value">12 <small>口</small></div>
            <div className="cover-stat-label">监控鱼塘</div>
          </div>
          <div className="cover-stat-divider" />
          <div className="cover-stat">
            <div className="cover-stat-icon"><Shield size={18} strokeWidth={1.8} /></div>
            <div className="cover-stat-value">99.2<small>%</small></div>
            <div className="cover-stat-label">系统可用</div>
          </div>
        </div>
      </div>

      <footer className="cover-footer">
        <span>智氧兴渔 v1.0</span>
        <span>·</span>
        <span>喷泉式智能增氧机器人管理平台</span>
      </footer>
    </div>
  );
}
