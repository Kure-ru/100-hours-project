import { Outlet } from 'react-router-dom'
import Nav from "./components/Nav"
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext';

const App = () => {

  return (
    <UserProvider>
   <Nav/>
   <ToastContainer/>
   <Outlet/>
   <Footer/>
   </UserProvider>
  )
}

export default App