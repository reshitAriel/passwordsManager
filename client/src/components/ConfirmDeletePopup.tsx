import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type ConfirmDeletePopupProps = {
  name?: string;
  itemId?: number | string;
  onDelete?: () => void;
  onClosePopup: () => void;
  deleteUrl: string;
} & DialogProps;

const ConfirmDeletePopup: FC<ConfirmDeletePopupProps> = ({
  name,
  itemId,
  onDelete,
  onClosePopup,
  deleteUrl,
  ...dialogProps
}) => {
  const deleteMutation = useMutation({
    mutationKey: ["save-site"],
    mutationFn: async () => {
      const response = await axios.delete(deleteUrl, {
        params: { id: itemId },
      });
      return response.data;
    },
    onSuccess: () => {
      onClosePopup();
      onDelete?.();
    },
  });

  return (
    <Dialog {...dialogProps} onClose={onClosePopup}>
      <DialogTitle>
        <IconButton onClick={onClosePopup}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete {name}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => deleteMutation.mutate()} variant="contained">
          Submit
        </Button>
      </DialogActions>

      {!!deleteMutation.error && (
        <Alert severity="error">an Error occurred, pleas try again later</Alert>
      )}
    </Dialog>
  );
};

export default ConfirmDeletePopup;
