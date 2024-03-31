import { useState } from "react";
import './Form.scss';
import { MdAddTask} from 'react-icons/md';
import { addDoc } from "firebase/firestore";
import { dbTasksCollection } from "../../utils/api/firebaseConfig";

function Form({ onAddTask }) {

    const [description, setDescription] = useState('');
    const [done, setDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmission = (event) => {
        event.preventDefault();

        if (description === '') {
            setErrorMessage('Please enter a description!');
        }
        else {
            //adding task
            
            const newTask = {description,done};

            addDoc(dbTasksCollection, newTask).then((tasksRef) => {
                console.log('Task Added:', tasksRef);
                onAddTask({ id: tasksRef.id, description,done });

            //reset formƒ
            setDescription('')
            setDone('open');
            setErrorMessage('');
            })
        }
    }


    return (
        <form
            onSubmit={handleFormSubmission}>

            <h2 className="addTaskHeader"><MdAddTask/>Add a new task:</h2>

            {errorMessage !== '' && (
                <div>
                    <p className="errorMessage">
                        {errorMessage}
                    </p>
                </div>
            )}

            <label className="formLabel">
                Description:
                <input
                    className="formInputDescription"
                    type="text"
                    value={description}
                    maxLength={150}
                    onChange={(event) => setDescription(event.target.value)}
                >
                </input>
            </label>
            
            <br/>
            <label className="formLabel">
                Status:

                <select
                    value={done}
                    onChange={(event) => setDone(event.target.value)}
                    className="formInputStatus"
                >
                    <option value="false" className="taskOpen"> Open</option>
                    <option value="true" className="taskCompleted"> Completed</option>
                </select>

            </label>
            
            <br/>
            <button className="buttonAdd">Add</button>
        </form>
    );
}

export default Form;