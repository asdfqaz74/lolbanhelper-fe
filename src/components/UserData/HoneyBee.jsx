const HoneyBee = ({ isMVP, isSad, className }) => {
  return (
    <>
      {isMVP ? (
        <div className={className}>
          <img src="/images/honeybee.webp" alt="꿀벌" />
        </div>
      ) : isSad ? (
        <div className={className}>
          <img src="/images/sadbee.png" alt="꿀벌" />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default HoneyBee;
