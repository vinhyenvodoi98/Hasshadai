import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerInterface {
  title: string;
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
}

export default function CustomDatePicker({title, date, setDate}: CustomDatePickerInterface) {

  return (
    <div className="w-full">
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <DatePicker
        selected={date}
        onChange={(date) => date && setDate(date)}
        showTimeSelect
        timeInputLabel="Time:"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="w-80 bg-transparent input input-bordered rounded-lg"
      />
    </div>
  );
}
