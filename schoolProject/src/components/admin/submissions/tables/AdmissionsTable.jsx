import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StatusChip from "./StatusChip";
import { formatDate } from "../../../../utils/formatters";

const AdmissionsTable = ({
  admissions,
  onViewDetails,
  onUpdateStatus,
  onDelete,
  approveLoading,
  rejectLoading,
}) => {
  if (admissions.length === 0) {
    return <Typography>No admission requests found.</Typography>;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Submitted</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admissions.map((admission) => (
            <TableRow
              key={admission.id}
              hover
              onClick={() => onViewDetails(admission)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{`${admission.firstName} ${admission.lastName}`}</TableCell>
              <TableCell>{admission.gradeApplying}</TableCell>
              <TableCell>{formatDate(admission.submittedAt)}</TableCell>

              <TableCell>
                <StatusChip status={admission.status} />
              </TableCell>
              <TableCell align="right">
                {admission.status === "pending" ? (
                  <>
                    <Button
                      size="small"
                      color="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(admission.id, "approved");
                      }}
                      disabled={approveLoading}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(admission.id, "rejected");
                      }}
                      disabled={rejectLoading}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(admission);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AdmissionsTable;
