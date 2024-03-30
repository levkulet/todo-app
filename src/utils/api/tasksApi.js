// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs, getDoc, addDoc, doc, setDoc, deleteDoc }
//     from 'firebase/firestore';

// import { db } from './firebaseConfig';
// import { useState } from "react";

// //const taskReqCollection = collection(db, 'tasks');

// // export const createTasks = async (input) => { 
// //     const [ description, status ] = input;

// //     try {
// //       const docRef = await addDoc(collection(db, 'tasks'), {
// //         description: description,
// //         done: status === 'completed'
// //       });

// //       const newTask = { 
// //         id: docRef.id, 
// //         description: description, 
// //         done: status === 'completed' };
      
// //      return newTask;

// //     }catch (error) {
// //       console.error('Error adding task:', error);
// //     }

// // };

// // export async function load(){

// //     try {
// //         //const dbTasks = await getDocs(collection(db, 'tasks'));

        
// //         // querySnapshot.forEach( (doc) => {
// //         //     data.push({
// //         //         id: doc.id, ...doc.data()
// //         //     });
// //         // });

// //         //const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
// //         //setData(tasksData);

// //         const dbTasksRef = doc(db, "tasks");
// //         const dbTasks = await getDoc(dbTasksRef);

// //         console.log(dbTasks);
// //         return { ...dbTasks.data()} ;
// //     } catch (error){
// //         console.log ("error:" , error)
// //     }

// // };


// const fetchData = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'tasks'));
//       const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
//       console.log("Tasks data from Firestore:", tasksData);

//       if (tasksData.length === 0) {
//         setMessage("There's no tasks to load. Try adding a task!");
//       } else {
//         setMessage('Tasks loaded!');
//       }
//       setTimeout(() => {
//         setMessage('');
//       }, 3000); // Hide the alert after 3 seconds

//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       setMessage('Error fetching tasks:', error);
//       setTimeout(() => {
//         setMessage('');
//       }, 3000); // Hide the alert after 3 seconds
//     }
//   };

//   export const fetchTasks = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'tasks'));
//       const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       console.log("Tasks data from Firestore:", tasksData);
//       return tasksData;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };
  