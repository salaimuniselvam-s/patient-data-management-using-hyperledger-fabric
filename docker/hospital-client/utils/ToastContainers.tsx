import React from "react";
import { ToastContainer } from "react-toastify";

const ToastContainers = () => {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ToastContainers;
