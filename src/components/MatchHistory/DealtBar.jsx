import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const DealtBar = ({ data, maxDamage }) => {
  const ref = useRef();
  const maxWidth = 350;
  const maxTotalDamage = maxDamage.maxDamage;

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const total = data.totalDamage_dealt;
    const scaleFactor = total / maxTotalDamage;
    const scaleWidth = maxWidth * scaleFactor;

    const physical = data.physicalDamage_dealt;
    const magic = data.magicDamage_dealt;
    const trueDamage = data.trueDamage_dealt;

    const physicalWidth = (physical / total) * scaleWidth;
    const magicWidth = (magic / total) * scaleWidth;
    const trueWidth = (trueDamage / total) * scaleWidth;

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#f9f9f9")
      .style("padding", "5px")
      .style("border", "1px #333 solid")
      .style("border-radius", "5px")
      .style("opacity", "0")
      .style("pointer-events", "none");

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", physicalWidth)
      .attr("height", 20)
      .attr("fill", "#f44336")
      .on("mouseover", function (event) {
        if (physical < 3000) {
          tooltip
            .style("opacity", 1)
            .text(`물리데미지: ${physical}`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY}px`);
        }
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    svg
      .append("rect")
      .attr("x", physicalWidth)
      .attr("y", 0)
      .attr("width", magicWidth)
      .attr("height", 20)
      .attr("fill", "#2196f3")
      .on("mouseover", function (event) {
        if (magic < 3000) {
          tooltip
            .style("opacity", 1)
            .text(`마법데미지: ${magic}`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY}px`);
        }
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    svg
      .append("rect")
      .attr("x", physicalWidth + magicWidth)
      .attr("y", 0)
      .attr("width", trueWidth)
      .attr("height", 20)
      .attr("fill", "rgb(147 51 234)")
      .on("mouseover", function (event) {
        if (trueDamage < 3000) {
          tooltip
            .style("opacity", 1)
            .text(`고정데미지: ${trueDamage}`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY}px`);
        }
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    if (physical > 3000) {
      svg
        .append("text")
        .attr("x", physicalWidth / 2) // 승리 막대의 중앙에 위치
        .attr("y", 13) // 막대의 중간 위치
        .attr("text-anchor", "middle") // 중앙 정렬
        .attr("fill", "white")
        .attr("font-size", "10px")
        .text(physical);
    }

    if (magic > 3000) {
      svg
        .append("text")
        .attr("x", physicalWidth + magicWidth / 2) // 승리 막대의 중앙에 위치
        .attr("y", 13) // 막대의 중간 위치
        .attr("text-anchor", "middle") // 중앙 정렬
        .attr("fill", "white")
        .attr("font-size", "10px")
        .text(magic);
    }

    if (trueDamage > 3000) {
      svg
        .append("text")
        .attr("x", physicalWidth + magicWidth + trueWidth / 2) // 승리 막대의 중앙에 위치
        .attr("y", 13) // 막대의 중간 위치
        .attr("text-anchor", "middle") // 중앙 정렬
        .attr("fill", "white")
        .attr("font-size", "10px")
        .text(trueDamage);
    }
  }, [data, maxTotalDamage]);

  return (
    <svg
      ref={ref}
      width={maxWidth}
      height={20}
      className="place-self-center"
    ></svg>
  );
};
