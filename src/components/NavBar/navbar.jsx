import { NavLink } from "react-router-dom";

const hoverMenu = "hover:text-black";

const Navbar = () => {
  return (
    <div className="w-full flex justify-around text-lg font-semibold mt-3 bg-slate-400 h-14 items-center offset border border-slate-500 text-slate-700 rounded-md">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-black" : hoverMenu)}
      >
        홈
      </NavLink>
      <NavLink
        to="/team"
        className={({ isActive }) => (isActive ? "text-black" : hoverMenu)}
      >
        대장 뽑기
      </NavLink>
      <NavLink
        to="/playerdb"
        className={({ isActive }) => (isActive ? "text-black" : hoverMenu)}
      >
        선수 DB
      </NavLink>
      <NavLink
        to="/archive"
        className={({ isActive }) => (isActive ? "text-black" : hoverMenu)}
      >
        내전 아카이브
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
