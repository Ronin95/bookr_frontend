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


function ManageNote() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const openModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const fetchTasks = () => {
        axios.get('http://127.0.0.1:8000/kanban/tasks/')
            .then(response => {
                const sortedTasks = response.data.sort((a: Task, b: Task) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                setTasks(sortedTasks);
            })
            .catch(error => console.error('Error fetching data: ', error));
    };

    const handleDelete = (taskId: number) => {
        axios.delete(`http://127.0.0.1:8000/kanban/tasks/${taskId}/`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            })
            .catch(error => console.error('Error deleting task: ', error));
    };

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
