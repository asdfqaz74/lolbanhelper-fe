import React from "react";
import { useDrop } from "react-dnd";

const TeamDropZone = ({ teamName, onDropUser, className, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "USER",
    drop: (item) => onDropUser(item.id, teamName),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <>
      <div ref={drop} className={`${className} ${isOver ? "bg-light" : ""}`}>
        {children}
      </div>
    </>
  );
};

export default TeamDropZone;
