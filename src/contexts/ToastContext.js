import { createContext ,useContext,useState } from "react";
import MyAlert from "../components/Alert";

 export const ToastContext = createContext({});
export const ToastProvider = ({ children }) => {
  const [Open, setOpen] = useState(false);
const [message, setMessage] = useState("");
  function ShowHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (

    <ToastContext.Provider value={{ ShowHideToast }}>
     <MyAlert Open={Open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast =()=>{
  return useContext(ToastContext);
}
