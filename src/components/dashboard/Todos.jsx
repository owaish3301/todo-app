import { CircleCheckBig, Pencil, Trash } from "lucide-react";

function Todos(){
    return (
      <main className="bg-[#f8f8f8] px-6 py-4 relative -top-5 rounded-t-3xl z-10">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Today's Tasks</h1>
            <CircularProgress />
          </div>
        </div>
        <div className="flex gap-3 flex-col">
          <TodoTemplate
            todoText={"Coffee with Karan"}
            time={"9AM - 10AM"}
            accentColor={"#F54927"}
          />
          <TodoTemplate
            todoText={"Learn Java"}
            time={"10AM - 12PM"}
            accentColor={"#07B02E"}
            status={"done"}
          />
          <TodoTemplate
            todoText={"Clg"}
            time={"1PM - 2PM"}
            accentColor={"#0718B0"}
          />
          <TodoTemplate
            todoText={"Finishing up the authentication of todo app"}
            time={"4PM - 8PM"}
            accentColor={"#E314C7"}
            status={"done"}
          />
          <TodoTemplate
            todoText={"Finishing up the authentication of todo app"}
            time={"4PM - 8PM"}
            accentColor={"#E314C7"}
            status={""}
          />
          <TodoTemplate
            todoText={"Finishing up the authentication of todo app"}
            time={"4PM - 8PM"}
            accentColor={"#E314C7"}
            status={""}
          />
        </div>
      </main>
    );
}

function TodoTemplate({todoText, time, accentColor, status}){
    const isDone = status === "done";
    
    return (
      <div className={`flex ${isDone ? "opacity-40" : ""}`}>
        <div
          className={`w-3 flex-shrink-0 rounded-tl-xl rounded-bl-xl`}
          style={{ backgroundColor: accentColor}}
        ></div>
        <div 
          className="px-2 py-3 grow shadow-lg rounded-tr-xl rounded-br-xl flex"
          style={{ backgroundColor: `${accentColor}08` }} // 3% opacity tint
        >
          <div className="pl-3 grow pr-2 min-w-0">
            <p className={`font-semibold break-words ${isDone ? "line-through" : ""}`}> {todoText} </p>
            <p className="opacity-80 text-[12px] text-[#888]"> {time} </p>
          </div>
          <div className="self-center flex items-center gap-2">
            <button
              aria-label="Delete"
              title="Delete"
              className="p-1.5 rounded-full shadow-sm"
              style={{
                color: accentColor,
                backgroundColor: `${accentColor}1A` // 10% opacity
              }}
            >
              <Trash />
            </button>

            <button
              aria-label="Edit"
              title="Edit"
              className="p-1.5 rounded-full shadow-sm"
              style={{
                color: accentColor,
                backgroundColor: `${accentColor}1A` // 10% opacity
              }}
            >
              <Pencil />
            </button>

            <button
              aria-label="Mark done"
              title="Mark done"
              className="p-1.5 rounded-full shadow-sm"
              style={{
                color: isDone ? "#ffffff" : accentColor,
                backgroundColor: isDone ? accentColor : `${accentColor}1A` // Filled when done, tinted when not
              }}
            >
              <CircleCheckBig />
            </button>
          </div>
        </div>
      </div>
    );
}

export default Todos;

function CircularProgress(){
    // compact circular progress placed to the right of the heading
    const total = 5;
    const completed = 2; // keep static 0/5 for now
    const pct = Math.max(0, Math.min(100, Math.round((completed / total) * 100)));

    const size = 48; // svg size
    const stroke = 4;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (pct / 100) * circumference;

    return (
        <div className="w-12 h-12 relative flex items-center justify-center">
            <svg width={size} height={size} className="block">
                <circle
                    stroke="#e5e7eb"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    stroke="#60a5fa"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="transform -rotate-90 origin-center"
                />
            </svg>
            <div className="absolute text-xs font-medium text-gray-700">{completed}/{total}</div>
        </div>
    )
}
