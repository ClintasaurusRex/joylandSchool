import React from "react";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LimitAlert = ({ show, onClose, itemType = "items", limit = 10, message }) => {
  const defaultMessage = `${itemType} limit reached (${limit} items). Please delete some older ${itemType.toLowerCase()} to free up space.`;

  return (
    <Collapse in={show}>
      <Alert
        severity="warning"
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message || defaultMessage}
      </Alert>
    </Collapse>
  );
};

export default LimitAlert;
