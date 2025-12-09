import { useNavigate } from "react-router";
import AddTodo from "../components/dashboard/AddTodo";
import AddTodoOverlay from "../components/dashboard/AddTodo/addTodoOverlay";
import Header from "../components/dashboard/Header";
import Todos from "../components/dashboard/Todos";

import { useEffect, useState } from "react";

function Dashboard(){
  const [showTodoOverlay, setShowTodoOverlay] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const checkAuth = async() => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}auth/verify`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jsonResponse = await response.json()
      if(!jsonResponse.success) navigate("/signin");
    }
    checkAuth()
  },[]);

    return (
      <>
        {showTodoOverlay && (
          <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-20" />

            <div className="w-4/5 absolute top-1/2 z-30 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-2xl rounded-2xl">
              <AddTodoOverlay showTodoOverlay={showTodoOverlay} setShowTodoOverlay={setShowTodoOverlay} />
            </div>
          </>
        )}
        <div className="relative">
          <Header />
          <Todos />
          <AddTodo todoOverlay={showTodoOverlay} setTodoOverlay={setShowTodoOverlay} />
        </div>
      </>
    );
}

export default Dashboard;