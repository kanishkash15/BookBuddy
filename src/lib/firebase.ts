import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdXcE4ErTfLRpuJE6J5CWahOgN6DSUtiQ",
  authDomain: "book-d9160.firebaseapp.com",
  projectId: "book-d9160",
  storageBucket: "book-d9160.firebasestorage.app",
  messagingSenderId: "645516112098",
  appId: "1:645516112098:web:37cc0df0c337381ab9eebb",
  measurementId: "G-7CJRJL0KM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Helper function to format Firebase error messages
const getErrorMessage = (error: any) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in or use a different email.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Please choose a stronger password (at least 6 characters).';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'storage/unauthorized':
      return 'Unauthorized to upload files. Please sign in again.';
    case 'storage/canceled':
      return 'Upload was cancelled. Please try again.';
    case 'storage/unknown':
      return 'An unknown error occurred during upload. Please try again.';
    default:
      return error.message || 'An error occurred. Please try again.';
  }
};

// Auth functions
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: getErrorMessage(error) };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: getErrorMessage(error) };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: getErrorMessage(error) };
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Image upload function with validation
export const uploadImage = async (file: File): Promise<string> => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload an image file (JPEG, PNG, etc.)');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('Image size should be less than 5MB');
  }

  try {
    // Create a unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExtension}`;
    
    // Create a reference to the file location
    const storageRef = ref(storage, `books/${fileName}`);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

// Book listing functions
export const addBook = async (bookData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'books'), {
      ...bookData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: getErrorMessage(error) };
  }
};

export const getMyListings = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'books'),
      where('sellerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateBook = async (bookId: string, updates: any) => {
  try {
    const bookRef = doc(db, 'books', bookId);
    await updateDoc(bookRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return { error: null };
  } catch (error: any) {
    return { error: getErrorMessage(error) };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    await deleteDoc(doc(db, 'books', bookId));
    return { error: null };
  } catch (error: any) {
    return { error: getErrorMessage(error) };
  }
}; 