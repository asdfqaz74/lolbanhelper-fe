import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import api from "../utils/api";

const validationSchema = yup.object({
  name: yup
    .string("이름을 입력해주세요")
    .required("이름은 필수 입력사항입니다"),
  game_id: yup
    .string("게임 아이디를 입력해주세요")
    .required("게임 아이디는 필수 입력사항입니다"),
  main_position: yup
    .string("주 포지션을 선택해주세요")
    .required("주 포지션은 필수 사항입니다"),
  sub_position: yup.string("서브 포지션을 선택해주세요"),
});

const EditPlayer = () => {
  const { id } = useParams();
  const location = useLocation();
  const [playerData] = useState(location.state?.data);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: playerData.name || "",
      game_id: playerData.game_id || "",
      main_position: playerData.main_position || "탑",
      sub_position: playerData.sub_position || "탑",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await api.put(`/user/${id}`, values);
        setOpenModal(false);
        navigate(`/playerdb/${id}`);
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex flex-col mt-5 py-2 px-20 bg-white shadow-2xl rounded-b-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOpenModal();
          }}
          className="flex flex-col max-w-80 justify-center place-self-center gap-8"
        >
          <TextField
            id="name"
            name="name"
            label="이름"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="game_id"
            name="game_id"
            label="게임 아이디"
            value={formik.values.game_id}
            onChange={formik.handleChange}
            error={formik.touched.game_id && Boolean(formik.errors.game_id)}
            helperText={formik.touched.game_id && formik.errors.game_id}
          />
          <FormControl
            error={
              formik.touched.main_position &&
              Boolean(formik.errors.main_position)
            }
          >
            <InputLabel id="main_position">메인 포지션</InputLabel>
            <Select
              id="main_position"
              label="메인 포지션"
              value={formik.values.main_position}
              onChange={(e) =>
                formik.setFieldValue("main_position", e.target.value)
              }
              onBlur={formik.handleBlur}
            >
              <MenuItem value={"탑"}>탑</MenuItem>
              <MenuItem value={"정글"}>정글</MenuItem>
              <MenuItem value={"미드"}>미드</MenuItem>
              <MenuItem value={"원딜"}>원딜</MenuItem>
              <MenuItem value={"서포터"}>서포터</MenuItem>
              <MenuItem value={"올라운드"}>올라운드</MenuItem>
            </Select>
            {formik.touched.main_position && formik.errors.main_position && (
              <FormHelperText>{formik.errors.main_position}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            error={
              formik.touched.sub_position && Boolean(formik.errors.sub_position)
            }
          >
            <InputLabel id="sub_position">서브 포지션</InputLabel>
            <Select
              id="sub_position"
              label="서브 포지션"
              value={formik.values.sub_position}
              onChange={(e) =>
                formik.setFieldValue("sub_position", e.target.value)
              }
              onBlur={formik.handleBlur}
            >
              <MenuItem value={"탑"}>탑</MenuItem>
              <MenuItem value={"정글"}>정글</MenuItem>
              <MenuItem value={"미드"}>미드</MenuItem>
              <MenuItem value={"원딜"}>원딜</MenuItem>
              <MenuItem value={"서포터"}>서포터</MenuItem>
              <MenuItem value={"나머지"}>나머지</MenuItem>
            </Select>
            {formik.touched.sub_position && formik.errors.sub_position && (
              <FormHelperText>{formik.errors.sub_position}</FormHelperText>
            )}
          </FormControl>
          <Button variant="contained" type="submit" color="secondary">
            수정하기
          </Button>
        </form>
      </div>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>수정하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button color="secondary" onClick={formik.handleSubmit}>
            예
          </Button>
          <Button color="secondary" onClick={() => setOpenModal(false)}>
            아니오
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditPlayer;
