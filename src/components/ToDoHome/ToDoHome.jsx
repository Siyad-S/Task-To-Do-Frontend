import React, { useEffect, useState } from "react";
import "./ToDoHome.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  postTask,
  updateTasks,
  getTask,
  updateTaskStatus,
} from "../../redux/slices/toDoHomeSlice";
import { useFormik } from "formik";
import Modal from "../Modal/Modal";
import DeleteModal from "../DeleteModal/DeleteModal";

const ToDoHome = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.toDo.allTask.taskData) || [];
  const singleTaskData = useSelector((state) => state.toDo.singleTask.taskData);

  const [showTasks, setShowTasks] = useState(true);
  const [action, setAction] = useState("");
  const [completedTasks, setCompletedTasks] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [modalName, setModalName] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [Id, setId] = useState("");
  const [actionName, setActionName] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(allTasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTasks(allTasks);
  }, [allTasks]);

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      description: "",
      dueDate: "",
      completed: false,
    },
    onSubmit: async (values) => {
      if (action === "edit") {
        setMessage("Edited");
        await dispatch(
          updateTasks({ id: singleTaskData._id, taskData: values })
        );
      } else {
        setMessage("Added");
        await dispatch(postTask(values));
      }
      setAction("");
      setModalName("Task");
      setOpenModal(true);
      clearFields();
    },
  });

  useEffect(() => {
    if (action === "edit" && singleTaskData) {
      formik.setValues({
        ...singleTaskData,
        dueDate: new Date(singleTaskData.dueDate).toISOString().split("T")[0],
      });
    }
  }, [action, singleTaskData, formik.setValues]);

  const clearFields = () => {
    formik.setValues({
      title: "",
      type: "all",
      description: "",
      dueDate: "",
      completed: false,
    });
  };

  const handleCheckboxChange = async (taskId, status) => {
    const newStatus = !status;
    await dispatch(updateTaskStatus({ id: taskId, completed: newStatus }));
    await dispatch(getTasks());
  };

  const handleEdit = (Id) => {
    setAction("edit");
    dispatch(getTask({ id: Id }));
  };

  const handleDeleteModal = (id) => {
    setActionName("Task");
    setDeleteModal(true);
    setId(id);
  };
  console.log(typeof filteredTasks);

  useEffect(() => {
    const completedCount = Object.values(allTasks).filter((task) => task.completed === true)
    setCompletedTasks(completedCount.length)
  },[allTasks])

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
              onChange={(e) => {
                formik.handleChange(e);
                const type = e.target.value;
                if (type !== "all") {
                  const filtered = allTasks.filter(
                    (task) => task.type === type
                  );
                  setFilteredTasks(filtered);
                } else {
                  setFilteredTasks(allTasks);
                }
              }}
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
            <div className="dueDate_input">
              <label htmlFor="dueDate">Due date:</label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                placeholder="due date"
                onChange={formik.handleChange}
                value={formik.values.dueDate}
              />
            </div>
            <button type="submit">
              {action === "edit" ? (
                "Save Edits"
              ) : (
                <i className="material-symbols-outlined">add</i>
              )}
            </button>
          </form>
        </div>
        <div className="task-list">
          {showTasks
            ? Object.values(filteredTasks)?.map((task, index) => (
                <div
                  key={index}
                  id="task-card"
                  className={
                    task.completed ? "completed-task" : "incomplete-task"
                  }
                >
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>
                  <p className="dueDate">
                    Due Date:{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toISOString().split("T")[0]
                      : "Invalid Date"}
                  </p>

                  <div className="taskStatus">
                    <label htmlFor={`taskStatus-${index}`}>
                      {task.completed ? (
                        <p className="completed-text">Completed</p>
                      ) : (
                        <p className="incomplete-text">Incomplete</p>
                      )}
                    </label>
                    <input
                      type="checkbox"
                      id={`taskStatus-${index}`}
                      checked={task.completed}
                      onChange={() =>
                        handleCheckboxChange(task._id, task.completed)
                      }
                      name="completed"
                    />
                  </div>
                  <div className="editDelete">
                    <button onClick={() => handleEdit(task._id)}>Edit</button>
                    <button onClick={() => handleDeleteModal(task._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
        {openModal && (
          <Modal
            name={modalName}
            setOpenModal={setOpenModal}
            message={message}
          />
        )}
        {deleteModal && (
          <DeleteModal
            name={actionName}
            taskId={Id}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            setFilteredTasks={setFilteredTasks}
          />
        )}
        <div className="footer">
          <span>Total Tasks:{allTasks.length}, Completed:{completedTasks}</span>
        </div>
      </div>
    </div>
  );
};

export default ToDoHome;
