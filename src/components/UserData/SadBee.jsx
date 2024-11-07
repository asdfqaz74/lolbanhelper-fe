const SadBee = ({ isSad, className }) => {
  return (
    <>
      {isSad ? (
        <div className={className}>
          <img src="/images/sadbee.png" alt="꿀벌" />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default SadBee;
