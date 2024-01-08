import React, { useEffect, useState } from 'react';
import editTask from '../../assets/img/edit-note.png';
import delete_Task from '../../assets/img/delete.png';
import './ManageNoteStyle.css';
import axios from 'axios';
import EditNoteModal from './EditNoteModal';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    timestamp: string;
}


/**
 * The `ManageNote` function is a React component that renders a list of tasks. It uses the `useState` hook to manage the
 * state of the component, including whether the edit modal is open (`isModalOpen`), the list of tasks (`tasks`), and the
 * currently selected task (`selectedTask`).
 * 
 * @function
 * @name ManageNote
 * @kind function
 * @returns {JSX.Element}
 */
function ManageNote() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    /**
     * The `openModal` function is a callback function that is called when the edit button is clicked for a specific task. It
     * takes a `task` parameter of type `Task`, which represents the task that was clicked.
     * 
     * @function
     * @name openModal
     * @kind variable
     * @memberof ManageNote
     * @param {Task} task
     * @returns {void}
     */
    const openModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    /**
     * The `fetchTasks` function is responsible for making an HTTP GET request to fetch the list of tasks from the server. It
     * uses the `axios` library to send the request to the specified URL (`http://127.0.0.1:8000/kanban/tasks/`).
     * 
     * @function
     * @name fetchTasks
     * @kind variable
     * @memberof ManageNote
     * @returns {void}
     */
    const fetchTasks = () => {
        axios.get('http://127.0.0.1:8000/kanban/tasks/')
            .then(response => {
                const sortedTasks = response.data.sort((a: Task, b: Task) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                setTasks(sortedTasks);
            })
            .catch(error => console.error('Error fetching data: ', error));
    };

    /**
     * The `handleDelete` function is a callback function that is called when the delete button is clicked for a specific task.
     * It takes the `taskId` as a parameter, which is the id of the task to be deleted.
     * 
     * @function
     * @name handleDelete
     * @kind variable
     * @memberof ManageNote
     * @param {number} taskId
     * @returns {void}
     */
    const handleDelete = (taskId: number) => {
        axios.delete(`http://127.0.0.1:8000/kanban/tasks/${taskId}/`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            })
            .catch(error => console.error('Error deleting task: ', error));
    };

    /**
     * The `refreshTasks` function is a callback function that is used to refresh the list of tasks. It is called when a task
     * is updated or deleted, and it fetches the updated list of tasks from the server by calling the `fetchTasks` function.
     * 
     * @function
     * @name refreshTasks
     * @kind variable
     * @memberof ManageNote
     * @returns {void}
     */
    const refreshTasks = () => {
        fetchTasks();
    };

    return (
        <div className='tasks-styles'>
            {tasks.map(task => (
                <div key={task.id} className='card-style'>
                    <div className='title-img'>
                        <h3>{task.title}</h3>
                        <div className='options-style'>
                            <img src={editTask} onClick={() => openModal(task)} alt="edit-note" />
                            <img src={delete_Task} onClick={() => handleDelete(task.id)} alt="delete-note" />
                        </div>
                    </div>
                    <div>
                        <p><strong>Status: </strong>{task.status}</p>
                    </div>
                    <div className='desc-style'>
                        <p><strong>Description: </strong>{task.description}</p>
                    </div>
                    <div>
                        <p><strong>Created: </strong>{new Date(task.timestamp).toLocaleString()}</p>                    </div>
                </div>
            ))}
            <EditNoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={selectedTask}
                onUpdated={refreshTasks} // pass the callback to EditNoteModal
            />
        </div>
    );
}

export default ManageNote;
