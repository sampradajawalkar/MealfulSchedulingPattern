import "./App.css";
import Graph from "./components/graph/graph.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function App() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="App">
      <DatePicker
      className="datePicker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <Graph date={startDate} />
    </div>
  );
}

export default App;
