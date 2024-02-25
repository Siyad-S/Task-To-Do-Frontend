import React, { useState } from "react";
import "./DeleteModal.css";
import {
  deleteTasks,
  getTasks
} from "../../redux/slices/toDoHomeSlice";
import { useDispatch } from "react-redux";

const Modal = ({ name, taskId, setDeleteModal, setFilteredTasks }) => {
  const dispatch = useDispatch();
  const [openChildModal, setOpenChildModal] = useState(false);
  const [parentModal, setParentModal] = useState(true);

  const refreshFunction = async () => {
        await setOpenChildModal(false);
        await dispatch(getTasks());
  };

  const handleDelete = async () => {
        await dispatch(deleteTasks({id:taskId}));
        setParentModal(false);
        setOpenChildModal(true);
  };

  const handleParentModal = () => {
    setDeleteModal(false);
  };

  return (
    <>
      {parentModal ? (
        <>
          <div className="modal">
            <div className="modal_head">
              <h2>Delete Confirmation</h2>
              <button>
                <i
                  className="material-symbols-outlined"
                  onClick={handleParentModal}
                >
                  close
                </i>
              </button>
            </div>
            <div className="modal_body">
              <h3>Do you want to delete?</h3>
            </div>
            <div className="modal_buttons">
              <button onClick={handleDelete}>Yes</button>
              <button onClick={handleParentModal}>No</button>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      ) : null}

      {openChildModal ? (
        <>
          <div className="modal">
            <div className="modal_head">
              <h2>Delete Notification</h2>
              <button>
                <i className="material-symbols-outlined">close</i>
              </button>
            </div>
            <div className="modal_body">
              <h3>The {name} Deleted Successfully</h3>
            </div>
            <div className="modal_buttons">
              <button onClick={refreshFunction}>Ok</button>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
