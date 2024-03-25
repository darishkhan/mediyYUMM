import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import {SignupPage} from "./pages/SignupPage"
import { BlogsPage } from './pages/BlogsPage';


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/blogs' element={<BlogsPage/>}></Route>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
