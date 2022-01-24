import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./graph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = (props) => {
  let { date } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://peaceful-inlet-29134.herokuapp.com/https://jsonkeeper.com/b/HU8U"
      );
      const body = await res.json();
      setData(body);
    }
    fetchData();
  }, []);

  const getData = () => {
    const filteredViaDate = data.filter((d) => {
      const split = d.item_date.split("-");
      const compareDate = new Date(split[0], split[1] - 1, split[2]).getTime();

      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      return compareDate === date.getTime();
    });
    const graphDate = {};
    // eslint-disable-next-line
    filteredViaDate.map((obj) => {
      const sDate = new Date(new Date(obj.schedule_time).toDateString());
      const sDateString =
        sDate.getDate() +
        "-" +
        (sDate.getMonth() < 10 ? "0" + sDate.getMonth() : sDate.getMonth());
      if (graphDate[sDateString]) {
        graphDate[sDateString]++;
      } else {
        graphDate[sDateString] = 1;
      }
    });
    return [Object.keys(graphDate), Object.values(graphDate)];
  };

  const datas = getData();
  return (
    <div className="graph-component">
      <Bar
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Scheduled Per Day",
            },
          },
        }}
        data={{
          labels: datas[0],
          datasets: [
            {
              label: "Schedule Count",
              data: datas[1],
              backgroundColor: "rgba(83, 83, 83, 0.8)",
            },
          ],
        }}
      />
    </div>
  );
};

export default Graph;
