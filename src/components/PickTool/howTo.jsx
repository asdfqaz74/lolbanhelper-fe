const HowTo = () => {
  return (
    <div className="flex flex-col gap-4 border-gray-400 border p-4">
      <h2 className="font-bold text-xl text-title">사용 방법</h2>
      <p className="text-red-500 font-semibold">
        시작 전 리셋버튼으로 전체 초기화
      </p>
      <p>1. 선수 명단에서 선수 10명을 고른다</p>
      <p>(없으면 선수 추가를 한다)</p>
      <p>2. 대장을 뽑아준다</p>
      <p>3. 대기인원에 있는 이름을 눌러 팀을 골라준다</p>
    </div>
  );
};

export default HowTo;
