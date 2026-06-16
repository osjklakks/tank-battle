export const latestMetrics = [
  {
    key: "do",
    label: "溶氧",
    unit: "mg/L",
    value: 5.6,
    status: "warning",
    note: "低于适宜区间下限",
  },
  {
    key: "temp",
    label: "水温",
    unit: "°C",
    value: 27.4,
    status: "good",
    note: "当前范围较适宜",
  },
  {
    key: "ph",
    label: "pH",
    unit: "",
    value: 7.8,
    status: "good",
    note: "处于正常区间",
  },
  {
    key: "nh3",
    label: "氨氮",
    unit: "mg/L",
    value: 0.18,
    status: "warning",
    note: "略高，需持续关注",
  },
  {
    key: "waterLevel",
    label: "水位",
    unit: "m",
    value: 1.45,
    status: "good",
    note: "水位正常",
  },
  {
    key: "robot",
    label: "机器人状态",
    unit: "",
    value: "巡航中",
    status: "good",
    note: "当前执行低氧点补氧",
  },
];

export const trends = Array.from({ length: 24 }).map((_, i) => {
  const hour = i;
  const baseDO = 5.2 + Math.sin(i / 3.2) * 0.9;
  const baseTemp = 26.5 + Math.sin((i - 4) / 4.2) * 1.2;

  return {
    hour: `${String(hour).padStart(2, "0")}:00`,
    do: Math.round((baseDO + (i % 5 === 0 ? -0.3 : 0)) * 10) / 10,
    temp: Math.round(baseTemp * 10) / 10,
    ph: Math.round((7.6 + Math.sin(i / 5) * 0.15) * 100) / 100,
  };
});

export const alerts = [
  {
    id: 1,
    pond: "东塘 A",
    message: "投喂区局部溶氧下降明显",
    level: "warning",
    time: "12:20",
  },
  {
    id: 2,
    pond: "东塘 A",
    message: "喷泉补氧已启动",
    level: "good",
    time: "12:26",
  },
  {
    id: 3,
    pond: "南塘 B",
    message: "氨氮接近预警值",
    level: "warning",
    time: "13:05",
  },
  {
    id: 4,
    pond: "西塘 C",
    message: "设备离线 5 分钟",
    level: "danger",
    time: "13:18",
  },
];
