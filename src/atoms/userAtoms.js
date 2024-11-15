import { atom } from "jotai";

export const checkedAtom = atom({}); // 체크박스 상태
export const userSearchAtom = atom(""); // 유저 검색 상태
export const pickUserAtom = atom([]); // 선택된 유저 상태
export const progressAtom = atom(0); // 진행도 상태
export const randomPlayersAtom = atom([]); // 랜덤으로 뽑힌 유저 상태
export const teamAAtom = atom([]); // A팀 상태
export const teamBAtom = atom([]); // B팀 상태
export const remainingPlayersAtom = atom([]); // 남은 유저 상태
export const historyAtom = atom([]); // 히스토리 상태
