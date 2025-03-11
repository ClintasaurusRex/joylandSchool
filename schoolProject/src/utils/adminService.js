import { serverTimestamp } from 'firebase/firestore';
import { addData, updateData, deleteData, fetchData } from './firestore';
import { db } from './config';
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

// News Management
export const addNewsItem = async (newsData) => {
  return await addData('news', {
    ...newsData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateNewsItem = async (id, newsData) => {
  return await updateData('news', id, {
    ...newsData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteNewsItem = async (id) => {
  return await deleteData('news', id);
};

export const fetchNews = async () => {
  return await fetchData('news');
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
  const sportsCollection = collection(db, 'sports');
  const snapshot = await getDocs(sportsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addSport = async (sportData) => {
  return await addData('sports', {
    ...sportData,
    createdAt: serverTimestamp(),
  });
};

export const updateSport = async (id, sportData) => {
  const sportRef = doc(db, 'sports', id);
  return await updateDoc(sportRef, {
    ...sportData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteSport = async (id) => {
  return await deleteData('sports', id);
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

export const submitAdmissionForm = async (formData) => {
  return await addData('admissions', {
    ...formData,
    status: 'pending',
    submittedAt: serverTimestamp(),
  });
};

export const submitContactForm = async (formData) => {
  return await addData('contacts', {
    ...formData,
    status: 'pending',
    submittedAt: serverTimestamp(),
  });
};

export const deleteSubmission = async (collectionName, submissionId) => {
  return await deleteData(collectionName, submissionId);
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
        email: import.meta.env.VITE_TEST_ADMIN_EMAIL,
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
// export const setTestUserAsAdmin = async () => {
//   try {
//     // Use environment variable for the test user UID
//     const testUserUid = import.meta.env.VITE_TEST_ADMIN_UID;

//     await updateUserRole(testUserUid, 'admin');
//     console.log('Test user successfully set as admin');
//     return { success: true };
//   } catch (error) {
//     console.error('Error setting test user as admin:', error);
//     return { success: false, error };
//   }
// };

// Add this function after the setTestUserAsAdmin function
export const setJoylandSchoolsAsAdmin = async () => {
  try {
    // Hardcoded Joyland Schools admin UID
    const joylandAdminUid = import.meta.env.VITE_TEST_ADMIN_UID;

    await updateUserRole(joylandAdminUid, 'admin');
    console.log('Joyland Schools user successfully set as admin');
    return { success: true };
  } catch (error) {
    console.error('Error setting Joyland Schools as admin:', error);
    return { success: false, error };
  }
};
