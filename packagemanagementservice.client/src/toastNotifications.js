import { ToastContainer, toast } from 'react-toastify';

const showNotification = (msg, success) => {
    const position = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }

    if (success) {
        toast.success(msg, position);
    }
    else {
        toast.error(msg, position);
    }
}

export default showNotification;
