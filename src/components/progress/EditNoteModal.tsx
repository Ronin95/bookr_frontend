import * as React from 'react';
import {Button} from 'baseui/button';
import {
  Modal,
  ModalHeader,
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

  React.useEffect(() => {
    if (task) {
      setTitleValue(task.title);
      setTextareaValue(task.description);
    }
  }, [task]);

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

function onUpdated() {
  throw new Error('Function not implemented.');
}
