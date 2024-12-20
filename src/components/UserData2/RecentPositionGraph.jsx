import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const RecentPositionGraph = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 150;
    const height = 150;
    const margin = { top: 20, right: 0, bottom: 50, left: 0 };

    const positionImage = {
      TOP: "images/탑.png",
      JUNGLE: "images/정글.png",
      MIDDLE: "images/미드.png",
      BOTTOM: "images/bottom.webp",
      UTILITY: "images/서포터.png",
    };

    const dataCounts = data.reduce(
      (acc, cur) => {
        if (cur) {
          acc[cur] = (acc[cur] || 0) + 1;
        }
        return acc;
      },
      { TOP: 0, JUNGLE: 0, MIDDLE: 0, BOTTOM: 0, UTILITY: 0 }
    );

    const processedData = Object.entries(dataCounts).map(([key, value]) => ({
      position: key,
      count: value,
    }));

    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .domain(processedData.map((d) => d.position))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height - margin.bottom, margin.top]);

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#f9f9f9")
      .style("padding", "5px")
      .style("border", "1px #333 solid")
      .style("border-radius", "5px")
      .style("opacity", 0)
      .style("pointer-events", "none")
      .style("z-index", 9999);

    svg
      .append("g")
      .selectAll("rect")
      .data(processedData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.position) + xScale.bandwidth() * 0.15)
      .attr("y", height - margin.bottom)
      .attr("height", 0)
      .attr("width", xScale.bandwidth() * 0.7)
      .attr("fill", "#939fb983")
      .transition()
      .duration(1000)
      .ease(d3.easeCubicInOut)
      .attr("y", (d) => yScale(d.count))
      .attr("height", (d) => height - margin.bottom - yScale(d.count));

    svg
      .selectAll("rect")
      .on("mousemove", function (event, d) {
        tooltip
          .style("opacity", 1)
          .text(`${d.count}게임`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    svg
      .append("g")
      .selectAll("image")
      .data(processedData)
      .enter()
      .append("image")
      .attr("x", (d) => xScale(d.position) + xScale.bandwidth() / 4)
      .attr("y", height - margin.bottom + 10)
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", 30)
      .attr("href", (d) => positionImage[d.position]);
  }, [data]);

  return <svg ref={ref} width={150} height={150}></svg>;
};
