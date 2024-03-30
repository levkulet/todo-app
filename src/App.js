import { useState, useEffect } from 'react';
//import uuid from "react-uuid";
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

import CustomAlert from './components/CustomAlert/CustomAlert.js';

//import { initializeApp } from "firebase/app";
import { collection, getDocs, getDoc, addDoc, doc, setDoc, deleteDoc }
  from 'firebase/firestore';

import { db } from './utils/api/firebaseConfig.js';


function App() {
  const [message, setMessage] = useState('');

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setMessage('Loading...');

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Tasks data from Firestore:", tasksData);

        if (tasksData.length === 0) {
          setMessage("There's no tasks to load. Try adding a task!");
        } else {
          setTasks(tasksData);
          setMessage('Tasks loaded!');
        }

        setTimeout(() => {
          setMessage('');
        }, 3000); // Hide the alert after 3 seconds
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setMessage('Error fetching tasks:', error);
        setTimeout(() => {
          setMessage('');
        }, 3000); // Hide the alert after 3 seconds
      }
    };

    fetchData();
  }, []);


  // Removes all tasks from the list and updates Firestore.
  const handleClearTasks = async () => {
    try {
      await Promise.all(tasks.map(async (task) => {
        await deleteDoc(doc(db, 'tasks', task.id));
      }));
      setTasks([]);
      setMessage('Clearing... Tasks cleared!');
      setTimeout(() => {
        setMessage('');
      }, 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.error('Error clearing tasks:', error);
    }
  };

  // Toggles a task status and updates Firestore.
  const handleStatusChange = async (id) => {
    try {
      const taskRef = doc(db, 'tasks', id);
      const taskSnapshot = await getDoc(taskRef);
      if (taskSnapshot.exists()) {
        const updatedStatus = !taskSnapshot.data().done;
        await setDoc(taskRef, { done: updatedStatus }, { merge: true });
        const updatedTasks = tasks.map((task) => {
          if (task.id === id) {
            return { ...task, done: updatedStatus };
          }
          return task;
        });
        setTasks(updatedTasks);

        setMessage('Updating... Task updated!');
        setTimeout(() => {
          setMessage('');
        }, 3000); // Hide the alert after 3 seconds
      }
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  // Removes a task from the list and updates Firestore.
  const handleTaskRemove = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
      setMessage('Updating... Task removed!');
      setTimeout(() => {
        setMessage('');
      }, 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  // add task to the list
  const handleAddTask = async (description, status) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        description: description,
        done: status === 'completed'
      });
      const newTask = { id: docRef.id, description: description, done: status === 'completed' };
      setTasks([...tasks, newTask]);
      setMessage('Saving... Task added!');
      setTimeout(() => {
        setMessage('');
      }, 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('Error adding task:', error);
      setTimeout(() => {
        setMessage('');
      }, 3000); // Hide the alert after 3 seconds
    }
  }

  return (
    <div className='main'>
      <Header></Header>
      <div className='container'>
        {message && <CustomAlert message={message} />}
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
