// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, addDoc, doc, setDoc, deleteDoc }
    from 'firebase/firestore';

import { db } from './firebaseConfig';

const taskReqCollection = collection(db, 'tasks');

export const createTasks = async (input) => { 
    const [ description, status ] = input;

    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        description: description,
        done: status === 'completed'
      });

      const newTask = { 
        id: docRef.id, 
        description: description, 
        done: status === 'completed' };
      
     return newTask;

    }catch (error) {
      console.error('Error adding task:', error);
    }

};
