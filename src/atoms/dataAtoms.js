import { atom } from "jotai";

export const userDataAtom = atom([]); // 선수 데이터
export const championDataAtom = atom([]); // 챔피언 데이터
export const resultDataAtom = atom([]); // 경기 결과 데이터
export const mostChampion = atom([]); // 가장 많이 픽한 챔피언 10개
export const mostWinChampion = atom([]); // 가장 승률이 높은 챔피언 5개
export const leastWinChampion = atom([]); // 가장 승률이 낮은 챔피언 5개
export const mostUserWinRate = atom([]); // 가장 승률이 높은 유저 5명
export const unprocessedMatchAtom = atom({
  _id: null,
  statsJson: [],
  processed: false,
}); // 처리되지 않은 경기 데이터
export const oneProcessedMatchAtom = atom({
  _id: null,
  statsJson: [],
  processed: true,
}); // 처리된 경기 데이터
