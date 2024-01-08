import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult, DraggableProvided, DroppableProvided, DraggableStateSnapshot, DroppableStateSnapshot } from "react-beautiful-dnd";
import axios from "axios";

// Define TypeScript interfaces
interface Task {
  id: string;
  content: string;
}

interface Column {
  name: string;
  items: Task[];
}

interface TaskStatus {
  [key: string]: Column;
}

/**
 * The `function Kanban() { ... }` is defining a React functional component named `Kanban`. This component represents a
 * Kanban board, which is a project management tool used to visualize and track the progress of tasks.
 * 
 * @function
 * @name Kanban
 * @kind function
 * @returns {JSX.Element}
 */
function Kanban() {

  // Drag and drop handler with TypeScript annotations
  const onDragEnd = async (result: DropResult, columns: TaskStatus, setColumns: React.Dispatch<React.SetStateAction<TaskStatus>>) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const sourceItems = [...start.items];
      const destItems = [...finish.items];
      const [movedTask] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, movedTask);

      const newColumns = {
        ...columns,
        [source.droppableId]: {
          ...start,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...finish,
          items: destItems,
        },
      };

      setColumns(newColumns);

      // Update the status in the backend
      await updateTaskStatus(movedTask.id, destination.droppableId);
    }
  };

  /**
   * The `updateTaskStatus` function is an asynchronous function that updates the status of a task in the backend. It takes
   * two parameters: `taskId` and `newStatus`.
   * 
   * @async
   * @function
   * @name updateTaskStatus
   * @kind variable
   * @memberof Kanban
   * @param {any} taskId
   * @param {any} newStatus
   * @returns {Promise<void>}
   */
  const updateTaskStatus = async (taskId: any, newStatus: any) => {
    try {
      await axios.put(`http://127.0.0.1:8000/kanban/tasks/update-status/${taskId}/`, {
        status: newStatus
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };
  
  /**
   * The line `const initialTaskStatus: TaskStatus = {` is declaring a constant variable named `initialTaskStatus` and
   * assigning it a value of an object of type `TaskStatus`. This object represents the initial state of the Kanban board
   * columns. It has three properties: `toDo`, `inProgress`, and `done`, each representing a column in the Kanban board. Each
   * column has a `name` property and an `items` property, which is an array of `Task` objects.
   * 
   * @constant
   * @name initialTaskStatus
   * @kind variable
   * @memberof Kanban
   * @type {TaskStatus}
   */
  const initialTaskStatus: TaskStatus = {
    toDo: { name: "To do", items: [] },
    inProgress: { name: "In Progress", items: [] },
    done: { name: "Done", items: [] }
  };

  const [columns, setColumns] = useState<TaskStatus>(initialTaskStatus);

  /**
   * The `useEffect(() => { ... })` hook is used to perform side effects in a functional component. In this specific code, it
   * is used to fetch tasks from the backend API and update the state of the `columns` variable with the fetched data.
   * 
   */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/kanban/tasks/');
        const data = response.data;
  
        // Initialize columns
        const fetchedColumns: TaskStatus = {
          toDo: { name: "To do", items: [] },
          inProgress: { name: "In Progress", items: [] },
          done: { name: "Done", items: [] }
        };
  
        // Sort tasks into columns based on status
        data.forEach((task: { id: number; title: string; status: string; }) => {
          const formattedTask: Task = {
            id: task.id.toString(),
            content: task.title
          };
  
          switch (task.status) {
            case 'todo':
              fetchedColumns.toDo.items.push(formattedTask);
              break;
            case 'inProgress':
              fetchedColumns.inProgress.items.push(formattedTask);
              break;
            case 'done':
              fetchedColumns.done.items.push(formattedTask);
              break;
            default:
              // Handle other statuses or errors
              break;
          }
        });
  
        setColumns(fetchedColumns);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
  
    fetchTasks();
  }, []);
  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", height: "100%", paddingLeft: "50px" }}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 450,
                            overflowY: "scroll"
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "10px",
                                        backgroundColor: snapshot.isDragging ? "#13D51A" : "#27CDF1",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Kanban;
