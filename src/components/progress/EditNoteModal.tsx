import * as React from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import axios from 'axios';

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void; // Add this line
  task: {
    id: number;
    title: string;
    description: string;
  } | null;
}


const EditNoteModal: React.FC<EditNoteModalProps> = ({ isOpen, onClose, task, onUpdated }) => {
  const [titleValue, setTitleValue] = React.useState<string>('');
  const [textareaValue, setTextareaValue] = React.useState<string>('');

  /**
   * The `React.useEffect(() => {` is a hook in React that allows you to perform side effects in functional components. In
   * this specific code, the `useEffect` hook is used to update the state of the `titleValue` and `textareaValue` variables
   * whenever the `task` prop changes.
   * 
   */
  React.useEffect(() => {
    if (task) {
      setTitleValue(task.title);
      setTextareaValue(task.description);
    }
  }, [task]);

  /**
   * The `handleUpdate` function is responsible for updating the task by making a PATCH request to the server. It uses the
   * `axios.patch` method to send the updated title and description to the server endpoint. If the request is successful, it
   * logs the response data to the console, closes the modal by calling the `onClose` function, and calls the `onUpdated`
   * function to refresh the tasks. If there is an error, it logs the error to the console.
   * 
   * @function
   * @name handleUpdate
   * @kind variable
   * @memberof EditNoteModal
   * @returns {void}
   */
  const handleUpdate = () => {
    if (task) {
      axios.patch(`http://127.0.0.1:8000/kanban/tasks/${task.id}/`, {
        title: titleValue,
        description: textareaValue,
      })
      .then(response => {
        console.log("Task updated:", response.data);
        onClose(); // Close the modal after update
        onUpdated(); // Call the callback to refresh tasks
      })
      .catch(error => console.error('Error updating task: ', error));
    }
  };

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      >
      <ModalBody>
        <h3>Update the title...</h3>
        <Input
          value={titleValue}
          placeholder={task ? task.title : "Enter new title"}
          clearOnEscape
          onChange={(e) => setTitleValue(e.currentTarget.value)}
        />
        <h3>Update the description...</h3>
        <Textarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.currentTarget.value)}
          placeholder={task ? task.description : "Enter new description"}
          clearOnEscape
        />
      </ModalBody>
      <ModalFooter>
      <ModalButton onClick={handleUpdate}>Update</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default EditNoteModal;
