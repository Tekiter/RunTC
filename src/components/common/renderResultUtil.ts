import { TestcaseResult } from "@/states/testcaseResult";
import { color } from "@/styles/color";

const statusColorMap: Record<TestcaseResult, string> = {
  idle: color.values.statusIdle,
  waiting: color.values.statusWaiting,
  running: color.values.statusRunning,
  FIN: color.values.statusAC,
  AC: color.values.statusAC,
  WA: color.values.statusWA,
  TLE: color.values.statusTLE,
  RE: color.values.statusRE,
  IE: color.values.statusRE,
};

const statusDescriptionMap: Record<TestcaseResult, string> = {
  idle: "",
  waiting: "대기중",
  running: "실행중",
  FIN: "실행완료",
  AC: "맞았습니다",
  WA: "틀렸습니다",
  TLE: "시간초과",
  RE: "런타임에러",
  IE: "실행실패",
};

export function getResultColor(result: TestcaseResult) {
  return statusColorMap[result] ?? color.values.foreground;
}

export function getResultDescription(result: TestcaseResult) {
  return statusDescriptionMap[result] ?? "Unknown";
}
