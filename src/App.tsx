import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Game from "./Game/Game";

export default function App() {
  return (
    <div>
      <Game/>
      <ToastContainer toastClassName=" relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer" />
    </div>
    
  );
}
