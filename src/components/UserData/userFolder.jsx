const UserFolder = ({ user }) => {
  const sortedUser = user.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center">
      {sortedUser.map((user) => (
        <div key={user._id} className="">
          <p className="border-t border-primary bg-dark rounded-t-lg px-2 text-gray-200 text-xl max-w-20">
            {user.name}
          </p>
          <div className="border border-primary bg-light px-2 flex flex-col shadow-md rounded-tr-lg min-w-24">
            <p>메인 포지션 : {user.main_position}</p>
            <p>서브 포지션 : {user.sub_position}</p>
            <p>최근 성적</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserFolder;
