import { useState, useEffect } from 'react';
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
import { collection, getDocs, } from 'firebase/firestore';
import { db } from './utils/api/firebaseConfig.js';


function App() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  //loading data from db
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log("Tasks data from Firestore:", tasksData);

        setTasks(tasksData);
        setIsLoading(false);
        if (tasksData.length === 0) {
          setMessage("There's no tasks to load. Try adding a task!");
        } else {
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
    setTasks([]);
    setMessage('Tasks Cleared!');
        setTimeout(() => {
          setMessage('');
        }, 3000); // Hide the alert after 3 seconds
  };

  // Toggles a task status and updates Firestore.
  const handleStatusChange = async (id) => {
    const updatedTasks = [...tasks];

    updatedTasks.forEach((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
    setTasks(updatedTasks);
    setMessage('Task Updated');
        setTimeout(() => {
          setMessage('');
        }, 3000); // Hide the alert after 3 seconds
  };

  // Removes a task from the list and updates Firestore.
  const handleTaskRemove = async (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);

    setMessage('Task Removed!');
        setTimeout(() => {
          setMessage('');
        }, 3000); // Hide the alert after 3 seconds
  };

  // add task to the list
  const handleAddTask = async (newTask ) => {
    setTasks([...tasks, newTask]);
    setMessage('Task Added!');
        setTimeout(() => {
          setMessage('');
        }, 3000); // Hide the alert after 3 seconds
  }


  return (
    <div className='main'>
      <Header></Header>
      <div className='container'>
        {message && <CustomAlert message={message} />}
        {
          isLoading ?
            (
              <div className='loading'> Loading ...</div>
            ) : (

              <Routes>
                <Route path="/" element={
                  <Tasks
                    tasks={tasks}
                    onStatusChange={handleStatusChange}
                    onTaskRemove={handleTaskRemove}
                    onClearTasks={handleClearTasks} />} />
                <Route path="/add" element={<Form onAddTask={handleAddTask} />} />
                <Route path="/help" element={<Help />} >
                  <Route path='' element={<HelpIntro />} />
                  <Route path='add' element={<HelpAdd />} />
                  <Route path='remove' element={<HelpRemove />} />
                  <Route path='status' element={<HelpStatus />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>

            )}
                          
      </div >
    </div >
  );
}

export default App;
