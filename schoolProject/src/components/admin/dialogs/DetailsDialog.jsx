import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
} from "@mui/material";
import { formatDate } from "../../../utils/formatters";

const DetailsDialog = ({
  open,
  onClose,
  submission,
  isAdmission,
  onUpdateStatus,
  onDelete,
  approveLoading,
  rejectLoading,
}) => {
  if (!submission) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isAdmission
          ? `Admission Request: ${submission.firstName} ${submission.lastName}`
          : `Contact Message: ${submission.name}`}
      </DialogTitle>
      <DialogContent dividers>
        {isAdmission ? (
          // Admission details
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Student Information
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" width="30%">
                      Full Name
                    </TableCell>
                    <TableCell>{`${submission.firstName} ${submission.lastName}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Date of Birth</TableCell>
                    <TableCell>{submission.dateOfBirth}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Gender</TableCell>
                    <TableCell>{submission.gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Email</TableCell>
                    <TableCell>{submission.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Phone</TableCell>
                    <TableCell>{submission.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Address</TableCell>
                    <TableCell>{submission.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Previous School</TableCell>
                    <TableCell>{submission.previousSchool}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Grade Applying For</TableCell>
                    <TableCell>{submission.gradeApplying}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="subtitle1" gutterBottom>
              Parent Information
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" width="30%">
                      Parent Name
                    </TableCell>
                    <TableCell>{submission.parentName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Parent Phone</TableCell>
                    <TableCell>{submission.parentPhone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Parent Email</TableCell>
                    <TableCell>{submission.parentEmail}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          // Contact message details
          <Box>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" width="30%">
                      Name
                    </TableCell>
                    <TableCell>{submission.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Email</TableCell>
                    <TableCell>{submission.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Phone</TableCell>
                    <TableCell>{submission.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Subject</TableCell>
                    <TableCell>{submission.subject}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Date Submitted</TableCell>
                    <TableCell>{formatDate(submission.createdAt)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Status</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,

                          bgcolor: isAdmission
                            ? submission.status === "pending"
                              ? "warning.light"
                              : submission.status === "approved"
                              ? "success.light"
                              : "error.light"
                            : submission.status === "unread"
                            ? "warning.light"
                            : "success.light",
                          color: isAdmission
                            ? submission.status === "pending"
                              ? "warning.dark"
                              : submission.status === "approved"
                              ? "success.dark"
                              : "error.dark"
                            : submission.status === "unread"
                            ? "warning.dark"
                            : "success.dark",
                        }}
                      >
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {!isAdmission && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                  Message Content
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
                    {submission.message}
                  </Typography>
                </Paper>
              </>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button variant="contained" color="error" onClick={() => onDelete(submission.id)}>
          Delete
        </Button>
        <Box>
          {isAdmission ? (
            // For admission requests
            submission.status === "pending" && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onUpdateStatus(submission.id, "approved")}
                  disabled={approveLoading}
                  sx={{ mr: 1 }}
                >
                  {approveLoading ? <CircularProgress size={24} /> : "Approve"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onUpdateStatus(submission.id, "rejected")}
                  disabled={rejectLoading}
                >
                  {rejectLoading ? <CircularProgress size={24} /> : "Reject"}
                </Button>
              </>
            )
          ) : (
            // For contact messages
            <>
              {submission.status === "unread" || submission.status === "pending" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onUpdateStatus(submission.id, "read")}
                  disabled={approveLoading}
                  sx={{ mr: 1 }}
                >
                  {approveLoading ? <CircularProgress size={24} /> : "Mark as Read"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => onUpdateStatus(submission.id, "unread")}
                  disabled={rejectLoading}
                  sx={{ mr: 1 }}
                >
                  {rejectLoading ? <CircularProgress size={24} /> : "Mark as Unread"}
                </Button>
              )}
            </>
          )}
          <Button onClick={onClose} sx={{ ml: 1 }}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default DetailsDialog;
