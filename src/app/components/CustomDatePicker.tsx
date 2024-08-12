import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({title}: {title: string}) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="w-full">
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeInputLabel="Time:"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="w-80 bg-transparent input input-bordered rounded-lg"
      />
    </div>
  );
}
