import { Link, NavLink } from "react-router-dom";

const hoverMenu = "hover:text-primaryHover transition duration-300";

const Navbar = () => {
  return (
    <>
      <div className="md:px-60 flex flex-col mt-5 top-0 sticky bg-white shadow-lg z-50">
        <div className="flex justify-center md:justify-between items-center">
          <Link to={"/"} className="flex items-center gap-2">
            <img src="/images/group.png" alt="" className="w-12" />
            <p className="text-4xl md:text-6xl text-dark font-bold whitespace-nowrap">
              Team Maker
            </p>
          </Link>
          <p className="hidden md:text-2xl text-dark font-semibold dblg:block">
            내전은 팀 메이커와 함께!
          </p>
        </div>
        <div className="flex justify-around md:justify-between mx-auto md:mx-0 mt-8 text-base dblg:text-lg h-10 min-w-80 md:min-w-[28.125rem] md:max-w-[45rem] font-semibold text-slate-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primaryActive"
                : hoverMenu
            }
          >
            홈
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              (isActive
                ? "text-primary border-b-2 border-primaryActive"
                : hoverMenu) + ` hidden md:block`
            }
          >
            팀 메이커
          </NavLink>
          <NavLink
            to="/playerdb"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primaryActive"
                : hoverMenu
            }
          >
            플레이어 정보
          </NavLink>
          <NavLink
            to="/archive"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primaryActive"
                : hoverMenu
            }
          >
            매치 히스토리
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
