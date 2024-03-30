import './Task.scss';
import { MdTask, MdRadioButtonUnchecked } from 'react-icons/md';
import { LuCheckCircle } from 'react-icons/lu';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../utils/api/firebaseConfig';

function Task(props) {
    const handleStatusClick = () => {
        const id = props.task.id;
        //props.onStatusChange(id);

        const tasksRef = doc(db, 'tasks', id);

        updateDoc(tasksRef, {
            done: !props.task.done,
        })
            .then(() => {
                props.onStatusChange(id);
                console.log('updated');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleRemoveClick = () => {
        const id = props.task.id;
        //props.onTaskRemove(id);

        const docRef = doc(db, 'tasks', id);
        
        deleteDoc(docRef)
            .then(() => {
                props.onTaskRemove(id);
            })
    }

    return (
        <>
            <div className='task'>
                <hr className='black' />
                <h3 className='description'>
                    <MdTask />{props.task.description}
                </h3>
                <div className='id'><span>Id:</span> {props.task.id}</div>
                <div className='status'>
                    <span>Status:</span> {props.task.done
                        ? <span className='complete'> <LuCheckCircle /> Completed</span>
                        : <span className='open'> <MdRadioButtonUnchecked /> Open</span>}
                </div>
                <button className='buttonChangeStatus' onClick={handleStatusClick}>Change Status</button>
                <button className='buttonRemoveTask' onClick={handleRemoveClick}>Remove Task</button>
            </div>
        </>
    );
}

export default Task;