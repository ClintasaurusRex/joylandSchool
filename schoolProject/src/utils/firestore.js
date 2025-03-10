import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

// Fetch data for a specific collection
export const fetchData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
// Add a new document to a collection
export const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    return null;
  }
};

// Update an existing document
export const updateData = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    console.log("Document updated with ID:", docId);
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

// Delete a document
export const deleteData = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log("Document deleted with ID:", docId);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
