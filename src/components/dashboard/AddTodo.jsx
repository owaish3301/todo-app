import { PlusCircle } from "lucide-react";

function AddTodo(){
    return (
      <button className="fixed top-[90%] left-1/2 -translate-x-1/2 z-20 bg-[#717eee] shadow-xl rounded-full p-0.5 transition-all duration-300 ease-out">
        <PlusCircle size={50} className="text-[#ffff]" strokeWidth={1} />
      </button>
    );
}

export default AddTodo;