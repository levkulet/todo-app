import { useState } from "react";
import './Form.scss';
import { MdAddTask} from 'react-icons/md';

function Form({ onAddTask }) {

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('open');
    const [errorMessage, setErrorMessage] = useState('');


    const handleFormSubmission = (event) => {
        event.preventDefault();

        if (description === '') {
            setErrorMessage('Please enter a description!');
        }
        else {

            onAddTask(description, status);

            //reset form
            setDescription('')
            setStatus('open');

            setErrorMessage('');
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
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="formInputStatus"
                >
                    <option value="open" className="taskOpen"> Open</option>
                    <option value="completed" className="taskCompleted"> Completed</option>
                </select>

            </label>
            
            <br/>
            <button className="buttonAdd">Add</button>
        </form>
    );
}

export default Form;