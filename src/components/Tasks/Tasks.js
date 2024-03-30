import Task from './Task/Task';
import './Tasks.scss';
import {FaListUl} from 'react-icons/fa'

function Tasks({tasks, onStatusChange, onTaskRemove, onClearTasks}) {
    
    return (
        <div className='tasksList'>
            <h2 className='tasksHeader'> <FaListUl/>These are the tasks:</h2>
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
            <button className='buttonClearTasks' onClick={onClearTasks}>Clear Tasks</button>
        </div>
    );
}

export default Tasks;