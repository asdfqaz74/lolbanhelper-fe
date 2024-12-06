import { Dialog } from "@mui/material";
import { useUserDetail } from "hooks/Data";

export const UserDetailDialog = ({ open, onClose, userId }) => {
  const { data, status } = useUserDetail(userId);

  return (
    <Dialog open={open} onClose={onClose}>
      <div>
        {status === "success" && data && (
          <div>
            <div>{data.name}</div>
            <div>{data.nickname}</div>
          </div>
        )}
      </div>
    </Dialog>
  );
};
