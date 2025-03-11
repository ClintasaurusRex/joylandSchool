import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  fetchAdmissionRequests,
  fetchContactSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from '../../utils/adminService';

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`submissions-tabpanel-${index}`}
      aria-labelledby={`submissions-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const FormSubmissions = () => {
  const [tabValue, setTabValue] = useState(0);
  const [admissions, setAdmissions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const admissionData = await fetchAdmissionRequests();
      const contactData = await fetchContactSubmissions();

      // Sort by submission date (newest first)
      setAdmissions(
        admissionData.sort((a, b) => {
          return (
            new Date(b.submittedAt?.toDate() || 0) -
            new Date(a.submittedAt?.toDate() || 0)
          );
        })
      );

      setContacts(
        contactData.sort((a, b) => {
          return (
            new Date(b.submittedAt?.toDate() || 0) -
            new Date(a.submittedAt?.toDate() || 0)
          );
        })
      );
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleUpdateStatus = async (id, status, isAdmission = true) => {
    try {
      if (status === 'approved') {
        setApproveLoading(true);
      } else if (status === 'rejected') {
        setRejectLoading(true);
      }

      const collection = isAdmission ? 'admissions' : 'contacts';
      await updateSubmissionStatus(collection, id, status);
      loadData(); // Reload data after update
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setApproveLoading(false);
      setRejectLoading(false);
    }
  };

  const handleDeleteClick = (submission, event) => {
    // Stop propagation to prevent opening details
    event.stopPropagation();
    setItemToDelete(submission);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    setDeleteLoading(true);
    try {
      const collection = tabValue === 0 ? 'admissions' : 'contacts';
      await deleteSubmission(collection, itemToDelete.id);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      loadData(); // Reload data after deletion
    } catch (error) {
      console.error('Error deleting submission:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusChip = (status) => {
    let color = 'default';
    switch (status) {
      case 'pending':
        color = 'warning';
        break;
      case 'approved':
        color = 'success';
        break;
      case 'rejected':
        color = 'error';
        break;
      case 'processed':
        color = 'info';
        break;
      default:
        color = 'default';
    }
    return <Chip label={status || 'pending'} color={color} size='small' />;
  };

  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        Form Submissions
      </Typography>

      <Paper elevation={2} sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label='Admission Requests' />
            <Tab label='Contact Messages' />
          </Tabs>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              <Typography variant='h6' gutterBottom>
                Admission Requests
              </Typography>

              {admissions.length === 0 ? (
                <Typography>No admission requests found.</Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Submitted</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {admissions.map((admission) => (
                        <TableRow
                          key={admission.id}
                          hover
                          onClick={() => handleViewDetails(admission)}
                        >
                          <TableCell>{`${admission.firstName} ${admission.lastName}`}</TableCell>
                          <TableCell>{admission.gradeApplying}</TableCell>
                          <TableCell>
                            {formatDate(admission.submittedAt)}
                          </TableCell>
                          <TableCell>
                            {getStatusChip(admission.status)}
                          </TableCell>
                          <TableCell align='right'>
                            {admission.status === 'pending' ? (
                              <>
                                <Button
                                  size='small'
                                  color='success'
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(
                                      admission.id,
                                      'approved'
                                    );
                                  }}
                                  disabled={approveLoading}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size='small'
                                  color='error'
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(
                                      admission.id,
                                      'rejected'
                                    );
                                  }}
                                  disabled={rejectLoading}
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Tooltip title='Delete'>
                                <IconButton
                                  color='error'
                                  size='small'
                                  onClick={(e) =>
                                    handleDeleteClick(admission, e)
                                  }
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
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant='h6' gutterBottom>
                Contact Messages
              </Typography>

              {contacts.length === 0 ? (
                <Typography>No contact messages found.</Typography>
              ) : (
                <TableContainer>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow
                          key={contact.id}
                          hover
                          onClick={() => handleViewDetails(contact)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>{contact.subject}</TableCell>
                          <TableCell>
                            {formatDate(contact.submittedAt)}
                          </TableCell>
                          <TableCell>{getStatusChip(contact.status)}</TableCell>
                          <TableCell align='right'>
                            <Tooltip title='Delete'>
                              <IconButton
                                color='error'
                                size='small'
                                onClick={(e) => handleDeleteClick(contact, e)}
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
              )}
            </TabPanel>
          </>
        )}
      </Paper>

      {/* Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth='md'
        fullWidth
      >
        {selectedSubmission && (
          <>
            <DialogTitle>
              {tabValue === 0
                ? `Admission Request: ${selectedSubmission.firstName} ${selectedSubmission.lastName}`
                : `Contact Message: ${selectedSubmission.name}`}
            </DialogTitle>
            <DialogContent dividers>
              {tabValue === 0 ? (
                // Admission details
                <Box>
                  <Typography variant='subtitle1' gutterBottom>
                    Student Information
                  </Typography>
                  <TableContainer
                    component={Paper}
                    variant='outlined'
                    sx={{ mb: 3 }}
                  >
                    <Table size='small'>
                      <TableBody>
                        <TableRow>
                          <TableCell component='th' width='30%'>
                            Full Name
                          </TableCell>
                          <TableCell>{`${selectedSubmission.firstName} ${selectedSubmission.lastName}`}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Date of Birth</TableCell>
                          <TableCell>
                            {selectedSubmission.dateOfBirth}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Gender</TableCell>
                          <TableCell>{selectedSubmission.gender}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Email</TableCell>
                          <TableCell>{selectedSubmission.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Phone</TableCell>
                          <TableCell>{selectedSubmission.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Address</TableCell>
                          <TableCell>{selectedSubmission.address}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Previous School</TableCell>
                          <TableCell>
                            {selectedSubmission.previousSchool}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>
                            Grade Applying For
                          </TableCell>
                          <TableCell>
                            {selectedSubmission.gradeApplying}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Typography variant='subtitle1' gutterBottom>
                    Parent Information
                  </Typography>
                  <TableContainer component={Paper} variant='outlined'>
                    <Table size='small'>
                      <TableBody>
                        <TableRow>
                          <TableCell component='th' width='30%'>
                            Parent Name
                          </TableCell>
                          <TableCell>{selectedSubmission.parentName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Parent Phone</TableCell>
                          <TableCell>
                            {selectedSubmission.parentPhone}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Parent Email</TableCell>
                          <TableCell>
                            {selectedSubmission.parentEmail}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : (
                // Contact message details
                <Box>
                  <TableContainer component={Paper} variant='outlined'>
                    <Table size='small'>
                      <TableBody>
                        <TableRow>
                          <TableCell component='th' width='30%'>
                            Name
                          </TableCell>
                          <TableCell>{selectedSubmission.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Email</TableCell>
                          <TableCell>{selectedSubmission.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Phone</TableCell>
                          <TableCell>
                            {selectedSubmission.phone || 'N/A'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Subject</TableCell>
                          <TableCell>{selectedSubmission.subject}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Message</TableCell>
                          <TableCell sx={{ whiteSpace: 'pre-wrap' }}>
                            {selectedSubmission.message}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th'>Submitted</TableCell>
                          <TableCell>
                            {formatDate(selectedSubmission.submittedAt)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              {tabValue === 0 && selectedSubmission.status === 'pending' && (
                <>
                  <Button
                    color='success'
                    onClick={() => {
                      handleUpdateStatus(selectedSubmission.id, 'approved');
                      handleCloseDetails();
                    }}
                    disabled={approveLoading}
                    startIcon={
                      approveLoading ? <CircularProgress size={20} /> : null
                    }
                  >
                    {approveLoading ? 'Approving...' : 'Approve'}
                  </Button>
                  <Button
                    color='error'
                    onClick={() => {
                      handleUpdateStatus(selectedSubmission.id, 'rejected');
                      handleCloseDetails();
                    }}
                    disabled={rejectLoading}
                    startIcon={
                      rejectLoading ? <CircularProgress size={20} /> : null
                    }
                  >
                    {rejectLoading ? 'Rejecting...' : 'Reject'}
                  </Button>
                </>
              )}
              {tabValue === 0 && selectedSubmission.status !== 'pending' && (
                <Button
                  color='error'
                  onClick={() => {
                    setItemToDelete(selectedSubmission);
                    setDeleteDialogOpen(true);
                    handleCloseDetails();
                  }}
                >
                  Delete
                </Button>
              )}
              {tabValue === 1 && selectedSubmission.status === 'pending' && (
                <Button
                  color='info'
                  onClick={() => {
                    handleUpdateStatus(
                      selectedSubmission.id,
                      'processed',
                      false
                    );
                    handleCloseDetails();
                  }}
                >
                  Mark Processed
                </Button>
              )}
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this submission? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color='error'
            disabled={deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={20} /> : null}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormSubmissions;
