import React, { useEffect, useState } from "react";
import "./ToDoHome.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  postTask,
  updateTasks,
  getTask,
  deleteTasks,
} from "../../redux/slices/toDoHomeSlice";
import { useFormik } from "formik";

const ToDoHome = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.toDo.allTask.taskData);
  const singleTaskData = useSelector((state) => state.toDo.singleTask.taskData);

  const [showTasks, setShowTasks] = useState(true);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  console.log(singleTaskData);

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      description: "",
      dueDate: "",
      completed: false,
    },
    onSubmit: (values) => {
      dispatch(postTask(values));
      dispatch(getTasks());
    },
  });

  const handleCheckboxChange = (taskId, completed) => {
    dispatch(updateTasks({ id: taskId, completed: !completed }));
  };

  const handleEdit = (Id) => {
    dispatch(getTask({ id: Id }));
  };

  const editFormik = useFormik({
    initialValues: {
      title: singleTaskData?.title ?? "",
      type: singleTaskData?.type ?? "",
      description: singleTaskData?.description ?? "",
      dueDate: singleTaskData?.dueDate ?? "",
      completed: singleTaskData?.completed ?? "",
    },
    onSubmit: (values) => {
      dispatch(updateTasks({id:singleTaskData._id, taskData:values}));
    },
  });

  return (
    <div className="main-body">
      <div className="to-do-list">
        <h1>To-Do List</h1>
        <div className="add-task-container">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Add new task..."
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <select
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
            >
              <option value="all">All</option>
              <option value="urgent">Urgent</option>
              <option value="important">Important</option>
              <option value="optional">Optional</option>
            </select>
            <input
              type="text"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Add description"
            />
            <label htmlFor="dueDate">Due date:</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              placeholder="due date"
              onChange={formik.handleChange}
              value={formik.values.dueDate}
            />
            <button type="submit">+</button>
          </form>
        </div>
        <div className="task-list">
          {showTasks &&
            Array.isArray(allTasks) &&
            allTasks.map((task, index) => (
              <div key={index}>
                <h2>Title: {task.title}</h2>
                <p>Type: {task.type}</p>
                <p>Description: {task.description}</p>
                <p>Due Date: {task.dueDate}</p>
                <label htmlFor={`taskStatus-${index}`}>
                  <p>completed</p>
                  <input
                    type="checkbox"
                    id={`taskStatus-${index}`}
                    checked={task.completed}
                    onChange={() =>
                      handleCheckboxChange(task._id, task.completed)
                    }
                    name="completed"
                  />
                </label>
                <button onClick={() => handleEdit(task._id)}>
                  <i className="material-symbols-outlined">edit</i>
                </button>
                <button onClick={() => dispatch(deleteTasks({ id: task._id }))}>
                  <i className="material-symbols-outlined">delete</i>
                </button>
              </div>
            ))}
        </div>

        <form onSubmit={editFormik.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Add new task..."
            onChange={editFormik.handleChange}
            value={editFormik.values.title}
          />
          <select
            name="type"
            onChange={editFormik.handleChange}
            value={editFormik.values.type}
          >
            <option value="all">All</option>
            <option value="urgent">Urgent</option>
            <option value="important">Important</option>
            <option value="optional">Optional</option>
          </select>
          <label htmlFor="dueDate">Due date:</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            placeholder="due date"
            onChange={editFormik.handleChange}
            value={editFormik.values.dueDate}
          />
          <input
            type="text"
            name="description"
            onChange={editFormik.handleChange}
            value={editFormik.values.description}
            placeholder="Add description"
          />
          <button type="submit">Save Edits</button>
        </form>

        <div className="footer">
          {/* Total tasks: <span>{tasks.length}</span>, Completed:{" "}
          <span>{tasks.filter((task) => task.completed).length}</span> */}
        </div>
      </div>
    </div>
  );
};

export default ToDoHome;
