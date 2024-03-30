import { useState } from 'react';
import uuid from "react-uuid";
import Header from './components/Header/Header.js';
import Tasks from './components/Tasks/Tasks.js';
import Form from './components/Form/Form.js';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Help from './components/Help/Help.js';
import NotFound from './components/NotFound/NotFound.js';
import HelpAdd from './components/Help/HelpAdd.js';
import HelpIntro from './components/Help/HelpIntro.js';
import HelpRemove from './components/Help/HelpRemove.js';
import HelpStatus from './components/Help/HelpStatus.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { getFirestore } from 'firebase/firestore';
import { getFirestore, collection, getDocs }
from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEhWOmf5jcTUE28uukfsSEeoR-jsMIWp0",
  authDomain: "todo-app-4c857.firebaseapp.com",
  projectId: "todo-app-4c857",
  storageBucket: "todo-app-4c857.appspot.com",
  messagingSenderId: "83655961795",
  appId: "1:83655961795:web:f807c8604ef572c114c676",
  measurementId: "G-5KYW022RKL"
};


const dbCollection = collection(db, 'users');
getDocs(dbCollection)
.then((querySnapshot) => {
querySnapshot.forEach((doc) => {
console.log(doc.id, doc.data());
});
})
.catch((error) => {
console.log('Error:', error);
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


function App() {

  const
    [tasks, setTasks] = useState
      (
        [
          {
            id: uuid(),
            description: "Clean Kitchen"
            ,
            done: true
          }, {
            id: uuid(),
            description: "Wash the dishes"
            ,
            done: false
          }, {
            id: uuid(),
            description: "Shovel Snow"
            ,
            done: false
          }
        ]
      );

  // Removes all tasks form the list.
  const handleClearTasks = () => {
    setTasks([]);
  }

  // Toggles a task status.
  const handleStatusChange = (id) => {
    const updatedTasks = [...tasks];
    updatedTasks
      .forEach((task) => {
        if
          (task
            .id === id) {
          task
            .done = !task
              .done
            ;
        }
      });
    setTasks
      (updatedTasks);
  }

  // Removes a task from the list.
  const handleTaskRemove = (id) => {
    const filteredTasks = tasks.filter(
      (task) => task.id !== id
    );
    setTasks(filteredTasks);
  }

  // Adds a task.
  const handleAddTask = (description, status) => {
    setTasks([
      ...tasks,
      {
        id: uuid(),
        description: description,
        done: status === 'completed'
      }
    ]);
  }


  return (
    <div className='main'>
      <Header></Header>
      <div className='container'>

        <Routes>
          <Route path="/" element={<Tasks tasks={tasks} onStatusChange={handleStatusChange} onTaskRemove={handleTaskRemove} onClearTasks={handleClearTasks} />} />
          <Route path="/add" element={<Form onAddTask={handleAddTask} />} />
          <Route path="/help" element={<Help />} >
            <Route path='' element={<HelpIntro />} />
            <Route path='add' element={<HelpAdd />} />
            <Route path='remove' element={<HelpRemove />} />
            <Route path='status' element={<HelpStatus />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
