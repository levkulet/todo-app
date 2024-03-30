import Task from './Task/Task';
import './Tasks.scss';
import { FaListUl } from 'react-icons/fa';

import { deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db, dbTasksCollection } from '../../utils/api/firebaseConfig';

function Tasks({ tasks, onStatusChange, onTaskRemove, onClearTasks }) {

    const dbClear = async () => {
        getDocs(dbTasksCollection).then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
                const docRef = doc(db, 'tasks', snapshot.id);
                deleteDoc(docRef).catch((error) => {
                    console.log(error);
                });
            });
            onClearTasks();
        })
    };

    return (
        <div className='tasksList'>
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
        </div>
    );
}

export default Tasks;