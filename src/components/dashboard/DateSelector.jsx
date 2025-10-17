import React from "react";

function DateSelector({ date = new Date() }) {
  const dateArr = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate 2 days before and 2 days after today
  for (let offset = -2; offset <= 2; offset++) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + offset);

    dateArr.push({
      day: dayNames[newDate.getDay()],
      date: newDate.getDate(),
      isToday: offset === 0,
    });
  }

  return (
    <div className="flex gap-3 justify-center items-center mt-4">
      {dateArr.map((d, idx) => (
        <DateCapsule key={idx} day={d.day} date={d.date} isToday={d.isToday} />
      ))}
    </div>
  );
}

function DateCapsule({ day, date, isToday }) {
  return (
    <div
      className={`${
        isToday ? "bg-white text-[#5967eb]" : "bg-[#5967eb] text-white"
      } px-3 py-4 rounded-full text-center w-16 transition-all duration-200 shadow-sm`}
    >
      <p className="font-light text-sm">{day}</p>
      <p className="font-bold text-xl">{date}</p>
    </div>
  );
}

export default DateSelector;
