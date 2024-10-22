import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex justify-around">
      <Link to="/">홈</Link>
      <Link to="/team">대장 뽑기</Link>
      <Link to="/players">선수 DB</Link>
      <Link to="/archive">내전 아카이브</Link>
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
