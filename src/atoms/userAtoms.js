import { atom } from "jotai";

export const checkedAtom = atom({}); // 체크박스 상태
export const userSearchAtom = atom(""); // 유저 검색 상태
export const pickUserAtom = atom([]); // 선택된 유저 상태
export const progressAtom = atom(0); // 진행도 상태
