// Per-pond data for 4 fish ponds
var ponds = {
  "东塘 A": {
    metrics: [
      { key: "do", label: "溶氧", unit: "mg/L", value: 5.6, status: "warning", note: "低于适宜区间下限" },
      { key: "temp", label: "水温", unit: "°C", value: 27.4, status: "good", note: "当前范围较适宜" },
      { key: "ph", label: "pH", unit: "", value: 7.8, status: "good", note: "处于正常区间" },
      { key: "nh3", label: "氨氮", unit: "mg/L", value: 0.18, status: "warning", note: "略高，需持续关注" },
      { key: "waterLevel", label: "水位", unit: "m", value: 1.45, status: "good", note: "水位正常" },
      { key: "robot", label: "机器人状态", unit: "", value: "巡航中", status: "good", note: "当前执行低氧点补氧" },
    ],
    alerts: [
      { id: 1, pond: "东塘 A", message: "投喂区局部溶氧下降明显", level: "warning", time: "12:20" },
      { id: 2, pond: "东塘 A", message: "喷泉补氧已启动", level: "good", time: "12:26" },
      { id: 3, pond: "东塘 A", message: "水草区溢流异常", level: "warning", time: "14:10" },
      { id: 4, pond: "东塘 A", message: "设备电量充足", level: "good", time: "15:00" },
    ],
  },
  "南塘 B": {
    metrics: [
      { key: "do", label: "溶氧", unit: "mg/L", value: 7.2, status: "good", note: "处于适宜区间" },
      { key: "temp", label: "水温", unit: "°C", value: 25.1, status: "good", note: "水温适宜" },
      { key: "ph", label: "pH", unit: "", value: 8.2, status: "warning", note: "略高，需调整" },
      { key: "nh3", label: "氨氮", unit: "mg/L", value: 0.08, status: "good", note: "正常范围" },
      { key: "waterLevel", label: "水位", unit: "m", value: 1.62, status: "good", note: "水位稳定" },
      { key: "robot", label: "机器人状态", unit: "", value: "待机", status: "good", note: "当前无低氧区域" },
    ],
    alerts: [
      { id: 1, pond: "南塘 B", message: "pH值接近上限", level: "warning", time: "10:15" },
      { id: 2, pond: "南塘 B", message: "自动换水已触发", level: "good", time: "10:22" },
      { id: 3, pond: "南塘 B", message: "水质稳定达标", level: "good", time: "13:45" },
    ],
  },
  "西塘 C": {
    metrics: [
      { key: "do", label: "溶氧", unit: "mg/L", value: 4.1, status: "danger", note: "严重低于安全值" },
      { key: "temp", label: "水温", unit: "°C", value: 30.8, status: "warning", note: "水温偏高" },
      { key: "ph", label: "pH", unit: "", value: 7.2, status: "good", note: "正常区间" },
      { key: "nh3", label: "氨氮", unit: "mg/L", value: 0.32, status: "danger", note: "超标，需紧急处理" },
      { key: "waterLevel", label: "水位", unit: "m", value: 1.28, status: "warning", note: "水位偏低" },
      { key: "robot", label: "机器人状态", unit: "", value: "补氧中", status: "good", note: "全塘巡航补氧" },
    ],
    alerts: [
      { id: 1, pond: "西塘 C", message: "溶氧严重下降，低于 5mg/L", level: "danger", time: "08:30" },
      { id: 2, pond: "西塘 C", message: "机器人紧急启动全塘补氧", level: "warning", time: "08:32" },
      { id: 3, pond: "西塘 C", message: "氨氮超标报警", level: "danger", time: "09:15" },
      { id: 4, pond: "西塘 C", message: "建议紧急换水 20%", level: "warning", time: "09:20" },
      { id: 5, pond: "西塘 C", message: "补氧后溶氧回升至 5.3mg/L", level: "good", time: "10:05" },
    ],
  },
  "北塘 D": {
    metrics: [
      { key: "do", label: "溶氧", unit: "mg/L", value: 6.8, status: "good", note: "溶氧充足" },
      { key: "temp", label: "水温", unit: "°C", value: 23.5, status: "good", note: "水温适宜" },
      { key: "ph", label: "pH", unit: "", value: 7.0, status: "good", note: "中性水质" },
      { key: "nh3", label: "氨氮", unit: "mg/L", value: 0.05, status: "good", note: "远低于警告值" },
      { key: "waterLevel", label: "水位", unit: "m", value: 1.78, status: "good", note: "水位良好" },
      { key: "robot", label: "机器人状态", unit: "", value: "充电中", status: "good", note: "预计 30 分钟后巡航" },
    ],
    alerts: [
      { id: 1, pond: "北塘 D", message: "全部指标正常", level: "good", time: "08:00" },
      { id: 2, pond: "北塘 D", message: "机器人自动返航充电", level: "good", time: "11:30" },
      { id: 3, pond: "北塘 D", message: "投喂计划已执行", level: "good", time: "14:00" },
    ],
  },
};

// Generate trend data per pond with slight variations
function generateTrends(baseTempOffset, baseDOOffset, phOffset) {
  return Array.from({ length: 24 }).map(function(_, i) {
    var baseDO = (5.2 + baseDOOffset) + Math.sin(i / 3.2) * 0.9;
    var baseTemp = (26.5 + baseTempOffset) + Math.sin((i - 4) / 4.2) * 1.2;
    return {
      hour: String(i).padStart(2, "0") + ":00",
      do: Math.round((baseDO + (i % 5 === 0 ? -0.3 : 0)) * 10) / 10,
      temp: Math.round(baseTemp * 10) / 10,
      ph: Math.round((7.6 + phOffset + Math.sin(i / 5) * 0.15) * 100) / 100,
    };
  });
}

ponds["东塘 A"].trends = generateTrends(0, 0, 0);
ponds["南塘 B"].trends = generateTrends(-1.3, 2.0, 0.6);
ponds["西塘 C"].trends = generateTrends(4.0, -1.0, -0.3);
ponds["北塘 D"].trends = generateTrends(-2.8, 1.5, -0.6);

export var pondNames = Object.keys(ponds);
export function getPondData(name) { return ponds[name] || ponds["东塘 A"]; }
export default ponds;
