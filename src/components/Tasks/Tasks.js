import Task from './Task/Task';
import './Tasks.scss';
import { FaListUl } from 'react-icons/fa';
import { deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db, dbTasksCollection } from '../../utils/api/firebaseConfig';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Tasks({ tasks, onStatusChange, onTaskRemove, onClearTasks }) {

    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        setIsEmpty(tasks.length === 0);
    }, [tasks]);

    const dbClear = async () => {
        getDocs(dbTasksCollection).then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
                const tasksRef = doc(db, 'tasks', snapshot.id);
                deleteDoc(tasksRef).catch((error) => {
                    console.log(error);
                });
            });
            onClearTasks();
        })
    };

    return (
        <div className='tasksList'>
            {
                isEmpty ? 
                (
                    <h3 className='empty'> There are no tasks. Click <NavLink to="/add" className="addLink" >Add</NavLink> to create a new task. </h3>
                ):(
                    <>
                    
                    <h2 className='tasksHeader'> <FaListUl />These are the tasks:</h2>
                    {tasks.map(
                        (task, index) => (
                            <Task
                                key={index}
                                task={task}
                                onStatusChange={onStatusChange}
                                onTaskRemove={onTaskRemove}
                            />
                        )
                    )}
                    <hr />
                    <button className='buttonClearTasks' onClick={dbClear}>Clear Tasks</button>
                    </>
                    )}
        </div>
    );
}

export default Tasks;