import { userDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useMemo } from "react";

export const useUserDataMap = () => {
  const [userData] = useAtom(userDataAtom);

  const userMap = useMemo(() => {
    if (userData) {
      return new Map(userData.map((user) => [user.game_id, user]));
    }
    return null;
  }, [userData]);

  return userMap;
};
