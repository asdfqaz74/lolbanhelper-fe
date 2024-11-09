import { useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useAddResult, useOneUserData } from "hooks/Data";
import { useAtom } from "jotai";
import { championDataAtom } from "atoms/dataAtoms";

const validationSchema = yup.object({
  champion: yup
    .string("챔피언을 입력해주세요")
    .required("챔피언은 필수 입력사항입니다"),
  victoryordefeat: yup
    .string("승패를 선택해주세요")
    .required("승패는 필수 사항입니다"),
  kills: yup.string("킬 수를 입력해주세요").required("킬 수는 필수 사항입니다"),
  deaths: yup
    .string("데스 수를 입력해주세요")
    .required("데스 수는 필수 사항입니다"),
  assists: yup
    .string("어시스트 수를 입력해주세요")
    .required("어시스트 수는 필수 사항입니다"),
});

const AddPlayerResult = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { data: playerData } = useOneUserData(id);
  const [championList] = useAtom(championDataAtom);
  const addResult = useAddResult();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const formik = useFormik({
    initialValues: {
      champion: "",
      victoryordefeat: "",
      kills: 0,
      deaths: 0,
      assists: 0,
      user: id,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = {
        ...values,
        kills: Number(values.kills),
        deaths: Number(values.deaths),
        assists: Number(values.assists),
      };
      addResult.mutate(formData);
      resetForm();
      setOpenModal(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex flex-col mt-5 mx-4 py-5 px-20 bg-white shadow-2xl rounded-b-lg">
        <p className="statssm:text-start text-center font-semibold text-lg">
          {playerData.name} 님의 전적 추가
        </p>
        {playerData.game_id ? (
          <p className="statssm:text-start text-center mb-5 whitespace-nowrap">
            {playerData.game_id}
          </p>
        ) : (
          <p>게임 아이디가 없습니다</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col statssm:max-w-96 justify-center place-self-center gap-12"
        >
          <div className="flex flex-col gap-4 place-self-center statssm:place-self-stretch text-center statssm:text-start max-w-48 statssm:max-w-96">
            <p>챔피언을 선택해주세요</p>
            <Autocomplete
              id="champion"
              options={championList}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) =>
                formik.setFieldValue("champion", value?._id)
              }
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="champion"
                  label="챔피언"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.champion && Boolean(formik.errors.champion)
                  }
                  helperText={formik.touched.champion && formik.errors.champion}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-between flex-col statssm:flex-row gap-2">
            <p>승패를 골라주세요</p>
            <FormControl
              error={
                formik.touched.victoryordefeat &&
                Boolean(formik.errors.victoryordefeat)
              }
            >
              <InputLabel id="victoryordefeat">승패</InputLabel>
              <Select
                label="승패"
                id="victoryordefeat"
                value={formik.values.victoryordefeat}
                onChange={(e) =>
                  formik.setFieldValue("victoryordefeat", e.target.value)
                }
                onBlur={formik.handleBlur}
                sx={{ width: 150 }}
              >
                <MenuItem value="win">승리</MenuItem>
                <MenuItem value="lose">패배</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-center statssm:text-start">
              K/D/A 를 입력해주세요
            </p>
            <div className="flex gap-4 justify-between">
              <FormControl
                error={formik.touched.kills && Boolean(formik.errors.kills)}
              >
                <TextField
                  id="kills"
                  type="number"
                  label="킬 수"
                  onBlur={formik.handleBlur}
                  value={formik.values.kills}
                  onChange={(e) =>
                    formik.setFieldValue("kills", e.target.value)
                  }
                  error={formik.touched.kills && Boolean(formik.errors.kills)}
                  helperText={formik.touched.kills && formik.errors.kills}
                  sx={{ width: isMobile ? 80 : 100 }}
                />
              </FormControl>
              <FormControl
                error={formik.touched.deaths && Boolean(formik.errors.deaths)}
              >
                <TextField
                  id="deaths"
                  type="number"
                  label="데스 수"
                  onBlur={formik.handleBlur}
                  value={formik.values.deaths}
                  onChange={(e) =>
                    formik.setFieldValue("deaths", e.target.value)
                  }
                  error={formik.touched.deaths && Boolean(formik.errors.deaths)}
                  helperText={formik.touched.deaths && formik.errors.deaths}
                  sx={{ width: isMobile ? 80 : 100 }}
                />
              </FormControl>
              <FormControl
                error={formik.touched.assists && Boolean(formik.errors.assists)}
              >
                <TextField
                  id="assists"
                  type="number"
                  label="어시스트 수"
                  value={formik.values.assists}
                  onBlur={formik.handleBlur}
                  onChange={(e) =>
                    formik.setFieldValue("assists", e.target.value)
                  }
                  error={
                    formik.touched.assists && Boolean(formik.errors.assists)
                  }
                  helperText={formik.touched.assists && formik.errors.assists}
                  sx={{ width: isMobile ? 80 : 100 }}
                />
              </FormControl>
            </div>
          </div>
          <Button type="submit" variant="contained">
            추가하기
          </Button>
        </form>
      </div>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>추가하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={formik.handleSubmit}>예</Button>
          <Button onClick={() => setOpenModal(false)}>아니오</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPlayerResult;
