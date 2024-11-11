import { Link, NavLink } from "react-router-dom";

const hoverMenu = "hover:text-primaryHover transition duration-200";

const Navbar = () => {
  return (
    <>
      <div className="md:px-36 flex flex-col mt-5 top-0 sticky bg-white z-20">
        <div className="flex justify-center md:justify-between items-center">
          <Link to={"/"} className="flex items-center gap-2">
            <img src="/images/group.png" alt="" className="w-12" />
            <p className="text-4xl md:text-6xl text-dark font-bold">
              Team Maker
            </p>
          </Link>
          <p className="hidden md:block md:text-2xl text-dark font-semibold">
            팀 매칭은 팀 메이커와 함께!
          </p>
        </div>
        <div className="flex justify-between mx-auto md:mx-0 mt-8 text-lg h-10 min-w-80 md:max-w-[55rem] font-semibold text-slate-600 pb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primaryActive"
                : hoverMenu
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              (isActive
                ? "text-primary border-b-2 border-primaryActive"
                : hoverMenu) + ` hidden md:block`
            }
          >
            Team Maker
          </NavLink>
          <NavLink
            to="/playerdb"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primaryActive"
                : hoverMenu
            }
          >
            Player DB
          </NavLink>
          <NavLink
            to="/archive"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primaryActive"
                : hoverMenu
            }
          >
            Archive
          </NavLink>
        </div>
      </div>
    </>
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
