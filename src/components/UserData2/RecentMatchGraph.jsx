import { useRef, useEffect } from "react";
import * as d3 from "d3";

export const RecentMatchGraph = ({ winOrLose, winRate }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 150;
    const height = 150;
    const radius = Math.min(width, height) / 2;

    // `winOrLose` 데이터를 win/lose 개수로 변환
    const dataCounts = winOrLose.reduce(
      (acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      },
      { win: 0, lose: 0 }
    );

    // D3에 사용할 데이터 형식으로 변환
    const processedData = Object.entries(dataCounts).map(([key, value]) => ({
      key,
      value,
    }));

    const color = d3
      .scaleOrdinal()
      .domain(["win", "lose"])
      .range(["#5383E8", "#E84057"]);

    const pie = d3.pie().value((d) => d.value);
    const data_ready = pie(processedData);

    const arc = d3.arc().innerRadius(30).outerRadius(radius); // 도넛 모양

    // 기존 SVG 초기화
    svg.selectAll("*").remove();

    // 차트 그룹 생성
    const chartGroup = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 도넛 차트 그리기
    chartGroup
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.key))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .transition()
      .duration(1000)
      .ease(d3.easeCubicInOut)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t));
        };
      });

    // 가운데 텍스트 애니메이션
    const text = chartGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("font-size", "20px")
      .style("fill", "#000");

    // winRate 값을 0에서 점점 증가
    let currentRate = { rate: 0 };
    d3.transition()
      .duration(1000)
      .tween("text", () => {
        const interpolate = d3.interpolate(0, winRate);
        return function (t) {
          currentRate.rate = Math.round(interpolate(t)); // 정수로 변환
          text.text(`${currentRate.rate}%`);
        };
      });
  }, [winOrLose, winRate]);

  return <svg ref={ref}></svg>;
};
