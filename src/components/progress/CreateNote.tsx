import './CreateNoteStyle.css';
import * as React from "react";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { SIZE } from "baseui/input";
import { Button, KIND, SHAPE } from "baseui/button";
import axios from 'axios';

function CreateNote() {
    const [titleValue, setTitleValue] = React.useState("");
    const [textareaValue, setTextareaValue] = React.useState("");
    const [todos, setTodos] = React.useState<{ title: string }[]>([]);

    const saveTaskToBackend = () => {
        const taskData = {
            title: titleValue,
            description: textareaValue,
            status: 'todo', 
            order: todos.length 
        };
    
        // Update todos state
        setTodos(prevTodos => [...prevTodos, taskData]);
    
        axios.post('http://127.0.0.1:8000/kanban/tasks/', taskData)
            .then(response => {
                console.log('Task saved:', response.data);
            })
            .catch(error => {
                console.error('There was an error saving the task:', error);
            });
    
        setTitleValue('');
        setTextareaValue('');
    };
    
    return (
        <div className='create-notes-style'>
            <div>
                <div className='titleValue-Input'>
                    <Input
                        value={titleValue}
                        onChange={e => setTitleValue(e.target.value)}
                        placeholder="Title of your note..."
                        clearable
                        clearOnEscape
                    />
                </div>
                <div className='textareaValue-Input'>
                    <Textarea
                        value={textareaValue}
                        onChange={e => setTextareaValue(e.currentTarget.value)}
                        placeholder="Describe your note in detail..."
                        overrides={{
                            Input: {
                            style: {
                                maxHeight: '380px',
                                minHeight: '380px',
                                minWidth: '300px',
                                width: '100vw', 
                                resize: 'both',
                            },
                            },
                            InputContainer: {
                            style: {
                                maxWidth: '100%',
                                width: 'min-content',
                            },
                            },
                        }}
                    />
                </div>
            </div>
            <div className='button-save'>
                <Button
                    onClick={saveTaskToBackend}
                    kind={KIND.secondary}
                    size={SIZE.large}
                    shape={SHAPE.pill}
                    >Save Note
                </Button>
            </div>
        </div>
    );
}

export default CreateNote;