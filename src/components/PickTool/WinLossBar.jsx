import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const WinLoseBar = ({ win, lose }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const total = win + lose;
    const width = 120;
    const winWidth = (win / total) * width;
    const loseWidth = (lose / total) * width;

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", winWidth)
      .attr("height", 20)
      .attr("fill", "#4caf50");

    svg
      .append("rect")
      .attr("x", winWidth)
      .attr("y", 0)
      .attr("width", loseWidth)
      .attr("height", 20)
      .attr("fill", "#f44336");

    if (win > 0) {
      svg
        .append("text")
        .attr("x", winWidth / 2) // 승리 막대의 중앙에 위치
        .attr("y", 13) // 막대의 중간 위치
        .attr("text-anchor", "middle") // 중앙 정렬
        .attr("fill", "white")
        .attr("font-size", "10px")
        .text(win);
    }

    // 패배 횟수 텍스트
    if (lose > 0) {
      svg
        .append("text")
        .attr("x", winWidth + loseWidth / 2) // 패배 막대의 중앙에 위치
        .attr("y", 13) // 막대의 중간 위치
        .attr("text-anchor", "middle") // 중앙 정렬
        .attr("fill", "white")
        .attr("font-size", "10px")
        .text(lose);
    }
  }, [win, lose]);

  return <svg ref={ref} width={120} height={20}></svg>;
};
