import React from "react";
import { useDrag } from "react-dnd";

const DraggableUser = ({ user }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "USER",
    item: { id: user._id, name: user.name, mvp: user.isMVP },
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
      <div className="flex items-center">
        {user.isMVP && (
          <img src="/images/honeybee.webp" alt="mvp" className="w-6 h-6" />
        )}

        <p>{user.name}</p>
        {user.main_position && (
          <img
            src={`/images/${user.main_position}.png`}
            alt={user.main_position}
            className="w-6 h-6"
          />
        )}
      </div>
    </div>
  );
};

export default DraggableUser;
