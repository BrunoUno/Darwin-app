import React from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertMessage({ message }) {
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        variant="warning"
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={message}
        action={[
          <IconButton key="close" onClick={handleClose} color="error">
            <CloseIcon color="action" />
          </IconButton>,
        ]}
      />
    </div>
  );
}
