import AppRoute from "./routes/AppRoute"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="">
      <AppRoute/>
      <ToastContainer />
    </div>
  )
}

export default App