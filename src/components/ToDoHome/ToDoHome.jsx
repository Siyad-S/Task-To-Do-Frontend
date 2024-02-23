import React, { useEffect, useState } from "react";
import "./ToDoHome.css";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, postTask } from "../../redux/slices/toDoHomeSlice";
import { useFormik } from "formik";

const ToDoHome = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.toDo.allTask.taskData
  );
  const [showTasks, setShowTasks] = useState(false)

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  console.log(allTasks);

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      description: "",
      dueDate: "",
    },
    onSubmit: (values) => {
        dispatch(postTask(values));
        setShowTasks(true)
    }    

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
            {showTasks ? (
                allTasks?.map((task, index) => (
                    <div key={index}>
                    <h2>{task.title}</h2>
                    </div>
                ))
            ): null}
        </div>
        <div className="footer">
          {/* Total tasks: <span>{tasks.length}</span>, Completed:{" "}
          <span>{tasks.filter((task) => task.completed).length}</span> */}
        </div>
      </div>
    </div>
  );
};

export default ToDoHome;
