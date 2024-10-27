import React from "react";
import { useDrag } from "react-dnd";

const DraggableUser = ({ user }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "USER",
    item: { id: user._id, name: user.name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "pointer",
      }}
      className="cursor-pointer text-lg"
    >
      <p>{user.name}</p>
    </div>
  );
};

export default DraggableUser;
