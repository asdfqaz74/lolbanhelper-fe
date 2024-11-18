import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const OddsWinning = ({ winRate }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const teamAWinRate = +winRate?.teamAWinRate ?? 0;
    const teamBWinRate = +winRate?.teamBWinRate ?? 0;
    const total = teamAWinRate + teamBWinRate;

    if (total === 0 || isNaN(total)) {
      svg
        .append("text")
        .attr("x", 60) // 중앙에 위치
        .attr("y", 13) // 막대의 중간 위치
        .attr("text-anchor", "middle") // 중앙 정렬
        .attr("fill", "white")
        .attr("font-size", "10px")
        .text("승률 정보가 없습니다.");

      return;
    }

    const width = 300;
    const teamAWidth = (teamAWinRate / total) * width;
    const teamBWidth = (teamBWinRate / total) * width;

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width / 2)
      .attr("height", 20)
      .attr("fill", "#3065ac")
      .transition()
      .duration(3000)
      .ease(d3.easeCubicInOut)
      .attr("width", teamAWidth);

    svg
      .append("rect")
      .attr("x", width / 2)
      .attr("y", 0)
      .attr("width", width / 2)
      .attr("height", 20)
      .attr("fill", "#f44336")
      .transition()
      .duration(3000)
      .ease(d3.easeCubicInOut)
      .attr("x", teamAWidth)
      .attr("width", teamBWidth);

    const teamAText = svg
      .append("text")
      .attr("x", width / 4) // teamA 막대의 중앙에 위치
      .attr("y", 13) // 막대의 중간 위치
      .attr("text-anchor", "middle") // 중앙 정렬
      .attr("fill", "white")
      .attr("font-size", "10px")
      .text("50");

    teamAText
      .transition()
      .duration(3000)
      .ease(d3.easeCubicInOut)
      .tween("text", function () {
        const i = d3.interpolateNumber(50, teamAWinRate);
        return function (t) {
          this.textContent = Math.round(i(t));
        };
      })
      .attr("x", teamAWidth / 2);

    const teamBText = svg
      .append("text")
      .attr("x", (3 * width) / 4) // teamB 막대의 중앙에 위치
      .attr("y", 13) // 막대의 중간 위치
      .attr("text-anchor", "middle") // 중앙 정렬
      .attr("fill", "white")
      .attr("font-size", "10px")
      .text("50");

    teamBText
      .transition()
      .duration(3000)
      .ease(d3.easeCubicInOut)
      .tween("text", function () {
        const i = d3.interpolateNumber(50, teamBWinRate);
        return function (t) {
          this.textContent = Math.round(i(t));
        };
      })
      .attr("x", teamAWidth + teamBWidth / 2);
  }, [winRate]);

  return <svg ref={ref} width={300} height={20}></svg>;
};
