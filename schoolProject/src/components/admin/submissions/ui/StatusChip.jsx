import React from "react";
import { Chip } from "@mui/material";

const StatusChip = ({ status, isContact = false }) => {
  let color = "default";

  if (isContact) {
    // Contact message specific statuses
    switch (status) {
      case "pending":
        color = "warning";
        break;
      case "unread":
        color = "warning";
        break;
      case "read":
        color = "success";
        break;
      default:
        color = "default";
    }
    return <Chip label={status || "unread"} color={color} size="small" />;
  } else {
    // Admission request statuses
    switch (status) {
      case "pending":
        color = "warning";
        break;
      case "approved":
        color = "success";
        break;
      case "rejected":
        color = "error";
        break;
      case "processed":
        color = "info";
        break;
      default:
        color = "default";
    }
    return <Chip label={status || "pending"} color={color} size="small" />;
  }
};

export default StatusChip;
