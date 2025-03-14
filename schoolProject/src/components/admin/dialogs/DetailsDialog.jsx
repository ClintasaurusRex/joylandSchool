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
import DownloadIcon from "@mui/icons-material/Download";

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

  const handleDownloadHTML = () => {
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${isAdmission ? "Admission Request" : "Contact Message"}</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { width: 30%; background-color: #f2f2f2; text-align: left; }
          h2 { margin-top: 20px; }
        </style>
      </head>
      <body>
    `;

    if (isAdmission) {
      htmlContent += `
        <h1>Admission Request: ${submission.firstName} ${submission.lastName}</h1>
        
        <h2>Student Information</h2>
        <table>
          <tr><th>Full Name</th><td>${submission.firstName} ${submission.lastName}</td></tr>
          <tr><th>Date of Birth</th><td>${submission.dateOfBirth}</td></tr>
          <tr><th>Gender</th><td>${submission.gender}</td></tr>
          <tr><th>Email</th><td>${submission.email}</td></tr>
          <tr><th>Phone</th><td>${submission.phone}</td></tr>
          <tr><th>Address</th><td>${submission.address}</td></tr>
          <tr><th>Previous School</th><td>${submission.previousSchool}</td></tr>
          <tr><th>Grade Applying For</th><td>${submission.gradeApplying}</td></tr>
        </table>
        
        <h2>Parent Information</h2>
        <table>
          <tr><th>Parent Name</th><td>${submission.parentName}</td></tr>
          <tr><th>Parent Phone</th><td>${submission.parentPhone}</td></tr>
          <tr><th>Parent Email</th><td>${submission.parentEmail}</td></tr>
        </table>
        
        <h2>Status Information</h2>
        <table>
          <tr><th>Status</th><td>${submission.status}</td></tr>
          <tr><th>Submitted At</th><td>${
            submission.submittedAt ? formatDate(submission.submittedAt) : "N/A"
          }</td></tr>
        </table>
      `;
    } else {
      htmlContent += `
        <h1>Contact Message: ${submission.name}</h1>
        
        <h2>Contact Information</h2>
        <table>
          <tr><th>Name</th><td>${submission.name}</td></tr>
          <tr><th>Email</th><td>${submission.email}</td></tr>
          <tr><th>Phone</th><td>${submission.phone}</td></tr>
          <tr><th>Subject</th><td>${submission.subject}</td></tr>
          <tr><th>Date Submitted</th><td>${
            submission.createdAt ? formatDate(submission.createdAt) : "N/A"
          }</td></tr>
          <tr><th>Status</th><td>${submission.status}</td></tr>
        </table>
        
        <h2>Message Content</h2>
        <div style="border: 1px solid #ddd; padding: 15px; white-space: pre-wrap;">
          ${submission.message}
        </div>
      `;
    }

    htmlContent += `
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isAdmission
      ? `admission_${submission.firstName}_${submission.lastName}.html`
      : `contact_${submission.name.replace(/\s+/g, "_")}.html`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
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
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownloadHTML}>
            Download
          </Button>
          <Button onClick={onClose} sx={{ ml: 1 }}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default DetailsDialog;
