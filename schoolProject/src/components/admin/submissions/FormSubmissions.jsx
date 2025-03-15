import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// Custom components
import TabPanel from "./ui/TabPanel";
import AdmissionsTable from "./tables/AdmissionsTable";
import ContactsTable from "./tables/ContactsTable";
import DetailsDialog from "../dialogs/DetailsDialog";
import LimitAlert from "../../admin/submissions/ui/LimitAlert";

// Custom hooks
import { useFormSubmissions } from "../../../hooks/useFormSubmissions";
import { useDialog } from "../../../hooks/useDialog";
import useLimitAlert from "../../../hooks/useLimitAlert";

const FormSubmissions = () => {
  const [tabValue, setTabValue] = useState(0);
  const detailsDialog = useDialog(false);
  const deleteDialog = useDialog(false);

  const {
    admissions,
    contacts,
    loading,
    approveLoading,
    rejectLoading,
    deleteLoading,
    handleUpdateStatus,
    handleDelete,
    // refreshData,
  } = useFormSubmissions();

  const admissionsLimit = useLimitAlert(admissions, 1);
  const contactsLimit = useLimitAlert(contacts, 1);

  // Get the current limit alert based on the active tab
  const currentLimitAlert = tabValue === 0 ? admissionsLimit : contactsLimit;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDeleteClick = (submission) => {
    deleteDialog.open(submission);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.data) return;

    const isAdmission = tabValue === 0;
    await handleDelete(deleteDialog.data.id, isAdmission);
    deleteDialog.close();

    // If we're deleting what's currently in the details dialog, close it
    if (detailsDialog.isOpen && detailsDialog.data?.id === deleteDialog.data.id) {
      detailsDialog.close();
    }
  };

  const handleStatusUpdate = (id, status) => {
    const isAdmission = tabValue === 0;
    handleUpdateStatus(id, status, isAdmission);
    detailsDialog.close();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Form Submissions
      </Typography>
      <LimitAlert
        show={currentLimitAlert.showAlert}
        onClose={currentLimitAlert.closeAlert}
        itemType={tabValue === 0 ? "Admission requests" : "Contact messages"}
        limit={1}
      />
      <Paper elevation={2} sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Admission Requests" />
            <Tab label="Contact Messages" />
          </Tabs>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Admission Requests
              </Typography>
              <AdmissionsTable
                admissions={admissions}
                onViewDetails={(admission) => detailsDialog.open(admission)}
                onUpdateStatus={(id, status) => handleUpdateStatus(id, status, true)}
                onDelete={handleDeleteClick}
                approveLoading={approveLoading}
                rejectLoading={rejectLoading}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Contact Messages
              </Typography>
              <ContactsTable
                contacts={contacts}
                onViewDetails={(contact) => detailsDialog.open(contact)}
                onDelete={handleDeleteClick}
              />
            </TabPanel>
          </>
        )}
      </Paper>

      {/* Details Dialog */}
      <DetailsDialog
        open={detailsDialog.isOpen}
        onClose={detailsDialog.close}
        submission={detailsDialog.data}
        isAdmission={tabValue === 0}
        onUpdateStatus={handleStatusUpdate}
        onDelete={(id) => {
          detailsDialog.close();
          handleDeleteClick({ ...detailsDialog.data, id });
        }}
        approveLoading={approveLoading}
        rejectLoading={rejectLoading}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.isOpen} onClose={deleteDialog.close}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this submission? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteDialog.close} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={20} /> : null}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormSubmissions;
