import { useState, useEffect } from "react";
import {
  fetchAdmissionRequests,
  fetchContactSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from "../utils/adminService";

export const useFormSubmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const admissionData = await fetchAdmissionRequests();
      const contactData = await fetchContactSubmissions();

      // Sort by submission date (newest first)
      setAdmissions(
        admissionData.sort((a, b) => {
          return new Date(b.submittedAt?.toDate() || 0) - new Date(a.submittedAt?.toDate() || 0);
        })
      );

      setContacts(
        contactData.sort((a, b) => {
          return new Date(b.submittedAt?.toDate() || 0) - new Date(a.submittedAt?.toDate() || 0);
        })
      );
    } catch (error) {
      console.error("Error loading submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, isAdmission = true) => {
    try {
      if (status === "approved") {
        setApproveLoading(true);
      } else if (status === "rejected") {
        setRejectLoading(true);
      }

      const collection = isAdmission ? "admissions" : "contacts";
      await updateSubmissionStatus(collection, id, status);
      loadData(); // Reload data after update
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setApproveLoading(false);
      setRejectLoading(false);
    }
  };

  const handleDelete = async (id, isAdmission = true) => {
    setDeleteLoading(true);
    try {
      const collection = isAdmission ? "admissions" : "contacts";
      await deleteSubmission(collection, id);
      loadData(); // Reload data after deletion
    } catch (error) {
      console.error("Error deleting submission:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    admissions,
    contacts,
    loading,
    approveLoading,
    rejectLoading,
    deleteLoading,
    handleUpdateStatus,
    handleDelete,
    refreshData: loadData,
  };
};
