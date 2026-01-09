import { useState } from 'react'
import './App.css'
import LoginSignup from "./pages/LoginSignup"
import {Routes , Route, Navigate} from "react-router-dom"
import Dashboard from "./pages/Dashboard"


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/LoginSignup" replace />;
  }
  return children;
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
       <Route path="/" element={<LoginSignup />}/>
       <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
     </Routes>

    </>
  )
}

export default App
