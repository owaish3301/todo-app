import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

function App(){
  return(
    <Routes>
      <Route path='/home' element={ <Dashboard /> } />
      <Route path='/signin' element={ <SignIn /> } />
      <Route path="/signup" element={ <SignUp /> } />
      <Route path="/reset-password" element={ <ForgotPassword /> } />
    </Routes>
  )
}

export default App;