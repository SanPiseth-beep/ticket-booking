import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3hwHMjQG7tCA1_3kqrMQKVO3uS8UOi2U",
    authDomain: "taskmanager-36b52.firebaseapp.com",
    projectId: "taskmanager-36b52",
    storageBucket: "taskmanager-36b52.firebasestorage.app",
    messagingSenderId: "254508016611",
    appId: "1:254508016611:web:2a276c4454e4110e5836d6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
