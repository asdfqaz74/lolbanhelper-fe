import { Autocomplete, TextField, useMediaQuery } from "@mui/material";
import { userDataAtom } from "atoms/dataAtoms";
import { userSearchAtom } from "atoms/userAtoms";
import { useAtom } from "jotai";

export const SearchBar = () => {
  const [userList] = useAtom(userDataAtom);
  const [, setSearchValue] = useAtom(userSearchAtom);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Autocomplete
      sx={{
        width: 200,
        marginBottom: 2,
        alignSelf: isMobile ? "center" : "end",
        marginX: 4,
      }}
      id="user-search"
      options={userList || []}
      getOptionLabel={(option) => option.name}
      onChange={(e, value) => setSearchValue(value ? value.name : "")}
      renderInput={(params) => (
        <TextField {...params} label="유저 검색" variant="outlined" />
      )}
    />
  );
};
