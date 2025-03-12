import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StatusChip from "./StatusChip";
import { formatDate } from "../../../../utils/formatters";

const ContactsTable = ({ contacts, onViewDetails, onDelete }) => {
  if (contacts.length === 0) {
    return <Typography>No contact messages found.</Typography>;
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow
              key={contact.id}
              hover
              onClick={() => onViewDetails(contact)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.subject}</TableCell>
              <TableCell>{formatDate(contact.submittedAt)}</TableCell>
              <TableCell>
                <StatusChip status={contact.status} />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(contact);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
