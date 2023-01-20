"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import format from "date-fns/format";
import { Calendar } from "react-date-range";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { dateInfo } from "../store/store";

export default function CalendarComponent() {
  const [calendar, setCalendar] = useState<Date>();
  const [seeCalendar, setSeeCalendar] = useState(false);
  const refOne = useRef<HTMLInputElement>(null); // To acsess calendar Dom
  const dispatch = useDispatch();

  // Basic settings and To resolve Server-Client Date Error
  useEffect(() => {
    setCalendar(new Date());
    document.addEventListener("keydown", hideOnEscape, true); // Whenever any key go down
    document.addEventListener("click", hideOnClickOutside, true); // Whenever clicked
  }, []);

  // Hide Calendar
  const hideOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") { // ESC is key
      setSeeCalendar(false);
    }
  };
  const hideOnClickOutside = (e: Event) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) { // Clicked outside of the Dom of Calendar
      setSeeCalendar(false);
    }
  };

  // Date-Pick
  const handleSelect = (date: Date) => {
    setCalendar(date);
    dispatch(dateInfo(date));
  };

  // Date form change
  const selected = calendar ? format(calendar, "MM/dd/yyyy") : "";

  return (
    <div className="flex-col">
      {/* Date value */}
      <div className="flex justify-center">
        <input
          value={selected}
          onClick={() => setSeeCalendar(!seeCalendar)}
          readOnly
          className="inputBox rounded-2xl px-2"
        />
      </div>
      {/* Calendar */}
      <span ref={refOne}>
        {seeCalendar && (
          <Calendar
            date={calendar ? calendar : new Date()}
            className="calendarElement rounded-2xl"
            onChange={handleSelect}
            months={1}
            minDate={new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)} // A month before is Min 
            maxDate={new Date()} // Today is max
          />
        )}
      </span>
    </div>
  );
}


