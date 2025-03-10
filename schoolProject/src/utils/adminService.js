import { serverTimestamp } from "firebase/firestore";
import { addData, updateData, deleteData, fetchData } from "./firestore";

// News Management
export const addNewsItem = async (newsData) => {
  return await addData("news", {
    ...newsData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
export const updateNewsItem = async (newsId, newsData) => {
  return await updateData("news", newsId, {
    ...newsData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteNewsItem = async (newsId) => {
  return await deleteData("news", newsId);
};

export const fetchNews = async () => {
  return await fetchData("news");
};

// Academic Content Management
export const addAcademicContent = async (academicData) => {
  return await addData("academics", {
    ...academicData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateAcademicContent = async (contentId, academicData) => {
  return await updateData("academics", contentId, {
    ...academicData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteAcademicContent = async (contentId) => {
  return await deleteData("academics", contentId);
};

export const fetchAcademics = async () => {
  return await fetchData("academics");
};

// Sports Content Management
export const addSportsContent = async (sportsData) => {
  return await addData("sports", {
    ...sportsData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateSportsContent = async (contentId, sportsData) => {
  return await updateData("sports", contentId, {
    ...sportsData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteSportsContent = async (contentId) => {
  return await deleteData("sports", contentId);
};

export const fetchSports = async () => {
  return await fetchData("sports");
};

// Form Submissions Management
export const fetchAdmissionRequests = async () => {
  return await fetchData("admissions");
};

export const fetchContactSubmissions = async () => {
  return await fetchData("contacts");
};

export const updateSubmissionStatus = async (collectionName, submissionId, status) => {
  return await updateData(collectionName, submissionId, {
    status,
    processedAt: serverTimestamp(),
  });
};

// User Management for Admins
export const addAdminUser = async (userData) => {
  return await addData("users", {
    ...userData,
    role: "admin",
    createdAt: serverTimestamp(),
  });
};

export const updateUserRole = async (userId, role) => {
  return await updateData("users", userId, {
    role,
    updatedAt: serverTimestamp(),
  });
};

export const fetchUsers = async () => {
  return await fetchData("users");
};
