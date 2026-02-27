import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    try {
      const res = await axios.get('https://bot-testing-4e9t.onrender.com/api/logs');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const chartData = {
    labels: logs.map(l => new Date(l.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Sleep (hrs)',
        data: logs.map(l => l.sleep),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Work Hours',
        data: logs.map(l => l.workHours),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Phone Usage (min)',
        data: logs.map(l => l.phoneUsageMinutes),
        borderColor: 'orange',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Daily Logs Overview</h2>
      {logs.length > 0 && <Line data={chartData} />}
    </div>
  );
}

export default Dashboard;
