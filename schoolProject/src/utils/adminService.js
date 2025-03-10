import { serverTimestamp } from 'firebase/firestore';
import { addData, updateData, deleteData, fetchData } from './firestore';
import { db } from './config';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

// News Management
export const addNewsItem = async (newsData) => {
  console.log('Adding news item:', newsData);
  // Placeholder
  return { id: 'placeholder-id' };
};

export const updateNewsItem = async (id, newsData) => {
  console.log('Updating news item:', id, newsData);
  // Placeholder
  return true;
};

export const deleteNewsItem = async (id) => {
  console.log('Deleting news item:', id);
  // Placeholder
  return true;
};

export const fetchNews = async () => {
  // Placeholder - return empty array for now
  return [];
};

// Academic Content Management
export const addAcademicContent = async (academicData) => {
  return await addData('academics', {
    ...academicData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateAcademicContent = async (contentId, academicData) => {
  return await updateData('academics', contentId, {
    ...academicData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteAcademicContent = async (contentId) => {
  return await deleteData('academics', contentId);
};

export const fetchAcademics = async () => {
  return await fetchData('academics');
};

// Sports Content Management
export const addSportsContent = async (sportsData) => {
  return await addData('sports', {
    ...sportsData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateSportsContent = async (contentId, sportsData) => {
  return await updateData('sports', contentId, {
    ...sportsData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteSportsContent = async (contentId) => {
  return await deleteData('sports', contentId);
};

export const fetchSports = async () => {
  return await fetchData('sports');
};

// Form Submissions Management
export const fetchAdmissionRequests = async () => {
  return await fetchData('admissions');
};

export const fetchContactSubmissions = async () => {
  return await fetchData('contacts');
};

export const updateSubmissionStatus = async (
  collectionName,
  submissionId,
  status
) => {
  return await updateData(collectionName, submissionId, {
    status,
    processedAt: serverTimestamp(),
  });
};

// User Management for Admins
export const addAdminUser = async (userData) => {
  return await addData('users', {
    ...userData,
    role: 'admin',
    createdAt: serverTimestamp(),
  });
};

export const updateUserRole = async (uid, role) => {
  try {
    const userRef = doc(db, 'users', uid);

    // Check if the document exists
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(userRef, { role });
    } else {
      // Create new document
      await setDoc(userRef, {
        uid,
        role,
        createdAt: new Date(),
        email: 'test.codemajic@gmail.com', // Hardcoded for test user
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error };
  }
};

export const fetchUsers = async () => {
  return await fetchData('users');
};

// Hardcoded function to set test.codemajic@gmail.com as admin
export const setTestUserAsAdmin = async () => {
  try {
    // Hardcoded UID for test.codemajic@gmail.com
    const testUserUid = 'kIPSkFsb6LWlqBtph0E6pSIiBLz2';

    await updateUserRole(testUserUid, 'admin');
    console.log('Test user successfully set as admin');
    return { success: true };
  } catch (error) {
    console.error('Error setting test user as admin:', error);
    return { success: false, error };
  }
};
