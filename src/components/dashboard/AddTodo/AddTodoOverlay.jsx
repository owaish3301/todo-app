import { useState } from "react";
import { CircleX } from "lucide-react";
import SubmitButton from "../../authentication/SubmitButton";
import Loader from "../../Loader";
import toast from "react-hot-toast";

function AddTodoOverlay({ showTodoOverlay, setShowTodoOverlay }) {
  const [todoInfo, setTodoInfo] = useState({
    title: "",
    scheduledDate: "",
    scheduleTime: "",
    hexColor: "#ff0000",
  });
  const [isLoading, setIsLoading] = useState(false);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try{
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}todos/add-todo`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({data:todoInfo}),
        }
      );

      const jsonResponse = await response.json();
      if(jsonResponse.success){
        toast.success(jsonResponse.message);
      }
      else{
        toast.error(jsonResponse.message);
      }
      setIsLoading(false);
    }
    catch{
      toast.error("An internal error occured");
      setIsLoading(false);
    }
    
  }
  return (
    <div className="bg-[#f8f8f8] p-8 h-full w-full rounded-2xl">
      <button
        className="fixed right-4 top-4"
        onClick={() => setShowTodoOverlay(!showTodoOverlay)}
      >
        <CircleX color={"#7b86ff"} size={30} />
      </button>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold"> Add Todo </h1>
        <form
          className="w-full max-w-sm flex flex-col"
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="title">Todo Title:</label>
          <div className="flex mb-2 items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
            <input
              id="title"
              className="w-full outline-none placeholder-gray-500"
              type={"text"}
              placeholder={"Enter todo"}
              name={"title"}
              value={todoInfo.title}
              onChange={(e) => {
                setTodoInfo((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>

          <label htmlFor="scheduled-date">Scheduled Date:</label>
          <div className="flex mb-3 items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
            <input
              id="scheduled-date"
              className="w-full outline-none placeholder-gray-500"
              type={"date"}
              name={"scheduledDate"}
              value={todoInfo.scheduledDate}
              onChange={(e) => {
                setTodoInfo((prev) => ({
                  ...prev,
                  scheduledDate: e.target.value,
                }));
              }}
            />
          </div>

          <label htmlFor="scheduled-time">Scheduled time:</label>
          <div className="flex mb-3 items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
            <input
              id="scheduled-time"
              className="w-full outline-none placeholder-gray-500"
              type={"time"}
              name={"scheduleTime"}
              value={todoInfo.scheduleTime}
              onChange={(e) => {
                setTodoInfo((prev) => ({
                  ...prev,
                  scheduleTime: e.target.value,
                }));
              }}
            />
          </div>

          <label htmlFor="accentColor">Pick accent color:</label>
          <div className="flex mb-3 items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
            <input
              id="accentColor"
              className="w-full outline-none placeholder-gray-500"
              type={"color"}
              name={"hexColor"}
              value={todoInfo.hexColor}
              onChange={(e) => {
                setTodoInfo((prev) => ({ ...prev, hexColor: e.target.value }));
              }}
            />
          </div>
          <SubmitButton
            text={isLoading ? <Loader /> : "Save Todo"}
            label={"addTodo"}
          />
        </form>
      </div>
    </div>
  );
}

export default AddTodoOverlay