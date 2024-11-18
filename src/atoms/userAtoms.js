import { atom } from "jotai";

export const checkedAtom = atom([]); // 대장 체크상태
export const userSearchAtom = atom(""); // 유저 검색 상태
export const pickUserAtom = atom([]); // 게임을 진행하게될 유저 상태
export const progressAtom = atom(0); // 진행도 상태
export const randomPlayersAtom = atom([]); // 랜덤으로 뽑힌 유저 상태
export const teamAAtom = atom([]); // A팀 상태
export const teamBAtom = atom([]); // B팀 상태
export const remainingPlayersAtom = atom([]); // 남은 유저 상태
export const historyAtom = atom([]); // 히스토리 상태
export const selectedPlayerAtom = atom([]); // 선택된 유저 상태
export const currentTeamAtom = atom("A"); // 현재 팀 상태
export const remainingPickCountAtom = atom(1); // 남은 픽 횟수 상태
export const pickStepAtom = atom(1); // 픽 단계 상태
export const firstBlueTeamAtom = atom(""); // 선블루팀 상태
export const winRateAtom = atom({}); // 승률 상태
