import React from "react";
import "./Modal.css";
import { getTasks } from "../../redux/slices/toDoHomeSlice";
import { useDispatch } from "react-redux";

const Modal = ({ message, setOpenModal, name }) => {
  const dispatch = useDispatch();

  const handleOkBtnClick = () => {
    if (name === "Task") {
      dispatch(getTasks());
      setOpenModal(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  return (
    <>
      <div className="add_modal">
        <div className="add_modal_head">
          <h2>
            {name} {message} Notification
          </h2>
          <button onClick={handleCloseModal}>
            <i className="material-symbols-outlined">close</i>
          </button>
        </div>
        <div className="add_modal_body">
          <h3>Succesfully {message}ed</h3>
        </div>
        <div className="add_modal_buttons">
          <button onClick={handleOkBtnClick}>Ok</button>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default Modal;
