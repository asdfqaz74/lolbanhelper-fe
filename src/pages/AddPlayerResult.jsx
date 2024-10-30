import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// import * as yup from "yup";
// import { useFormik } from "formik";

// const validationSchema = yup.object({
//   champion: yup
//     .string("챔피언을 입력해주세요")
//     .required("챔피언은 필수 입력사항입니다"),
//   victoryordefeat: yup
//     .string("승패를 선택해주세요")
//     .required("승패는 필수 사항입니다"),
//   kills: yup.string("킬 수를 입력해주세요").required("킬 수는 필수 사항입니다"),
//   deaths: yup
//     .string("데스 수를 입력해주세요")
//     .required("데스 수는 필수 사항입니다"),
//   assists: yup
//     .string("어시스트 수를 입력해주세요")
//     .required("어시스트 수는 필수 사항입니다"),
// });

const AddPlayerResult = () => {
  const { id } = useParams();
  const location = useLocation();
  const [playerData] = useState(location.state?.data);
  console.log(id, playerData);

  return (
    <>
      <p>챔피언을 골라주세요</p>
      <p>승패를 골라주세요</p>
      <p>kda 를 입력해주세요</p>
    </>
  );
};

export default AddPlayerResult;
