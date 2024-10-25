import { NavLink } from "react-router-dom";

const hoverMenu = "hover:text-primaryHover transition duration-200";

const Navbar = () => {
  return (
    <div className="w-full flex justify-around text-lg font-semibold bg-white h-20 items-center border  text-black rounded-b-lg shadow-md">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary " : hoverMenu)}
      >
        HOME
      </NavLink>
      <NavLink
        to="/team"
        className={({ isActive }) => (isActive ? "text-primary " : hoverMenu)}
      >
        Team Maker
      </NavLink>
      <NavLink
        to="/playerdb"
        className={({ isActive }) => (isActive ? "text-primary" : hoverMenu)}
      >
        Player DB
      </NavLink>
      <NavLink
        to="/archive"
        className={({ isActive }) => (isActive ? "text-primary" : hoverMenu)}
      >
        Archive
      </NavLink>
    </div>
  );
};

export default Navbar;

/*
네비게이션 바에 들어갈 메뉴

1. 홈 -> 소개 페이지로 이동
2. 대장 뽑기
3. 선수 DB
4. 내전 아카이브
*/
