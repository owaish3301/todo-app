import AddTodo from "../components/dashboard/AddTodo";
import AddTodoOverlay from "../components/dashboard/AddTodo/addTodoOverlay";
import Header from "../components/dashboard/Header";
import Todos from "../components/dashboard/Todos";

import { useState } from "react";

function Dashboard(){
  const [showTodoOverlay, setShowTodoOverlay] = useState(false);
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