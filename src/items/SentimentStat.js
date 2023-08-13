import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'auth/AuthContext';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function SentimentPieChart() {
  const { userName } = useContext(AuthContext);
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const mentionedData = await fetch('http://localhost:5000/mentioned').then(response => response.json());
      const repliesData = await fetch('http://localhost:5000/replies').then(response => response.json());

      const combinedData = [...mentionedData, ...repliesData];

      let positive = 0;
      let negative = 0;
      let neutral = 0;

      combinedData.forEach(dataPoint => {
        const bank = dataPoint.bank;
        const sentiment = dataPoint.sentiment;

        if (bank === userName) {
          if (sentiment === 'Positive') {
            positive += 1;
          } else if (sentiment === 'Negative') {
            negative += 1;
          } else if (sentiment === 'Neutral') {
            neutral += 1;
          }
        }
      });

      setPositiveCount(positive);
      setNegativeCount(negative);
      setNeutralCount(neutral);
    }

    fetchData();
  }, [userName]);

  const data = [
    { name: 'Positive', value: positiveCount },
    { name: 'Negative', value: negativeCount },
    { name: 'Neutral', value: neutralCount }
  ];

  const COLORS = ['#90EE90', '#F08080', '#D3D3D3'];

  return (
    <div>
      {/* <h1>Sentiment Pie Chart</h1> */}
      <PieChart width={400} height={350}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
}

export default SentimentPieChart;