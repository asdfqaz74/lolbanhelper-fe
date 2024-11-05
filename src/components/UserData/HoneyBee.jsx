const HoneyBee = ({ isMVP, className }) => {
  return (
    <>
      {isMVP ? (
        <div className={className}>
          <img src="/images/honeybee.webp" alt="꿀벌" />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default HoneyBee;
