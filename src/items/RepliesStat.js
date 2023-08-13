import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'auth/AuthContext';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Dot } from 'recharts';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
} from "reactstrap";

function RepliesStat() {
  const { userName } = useContext(AuthContext);
  const [tweetData, setTweetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/replies');
        const data = response.data;
        const myMaybankReplies = data.filter((reply) => reply.bank === userName);
        const repliesCounts = {};

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        // Filter replies of the current month
        const filteredReplies = myMaybankReplies.filter((reply) => {
          const date = new Date(reply.dateTime);
          return date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear;
        });

        if (filteredReplies.length === 0) {
          const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
          const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

          // Filter replies of the previous month
          const previousMonthReplies = myMaybankReplies.filter((reply) => {
            const date = new Date(reply.dateTime);
            return date.getMonth() + 1 === previousMonth && date.getFullYear() === previousYear;
          });

          previousMonthReplies.forEach((reply) => {
            const date = new Date(reply.dateTime);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            repliesCounts[formattedDate] = (repliesCounts[formattedDate] || 0) + 1;
          });
        } else {
          filteredReplies.forEach((reply) => {
            const date = new Date(reply.dateTime);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            repliesCounts[formattedDate] = (repliesCounts[formattedDate] || 0) + 1;
          });
        }

        const sortedDates = Object.keys(repliesCounts).sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateA - dateB;
        });

        const formattedData = sortedDates.map((date) => ({
          date,
          repliesCount: repliesCounts[date],
        }));
        setTweetData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tweet data:', error);
      }
    }

    fetchData();
  }, [userName]);

  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
  }, []);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Card className="bg-gradient-default shadow">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h2 className="text-white mb-0">Number of Replies Received for June {currentYear}</h2>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              <LineChart width={830} height={350} data={tweetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#fff' }}
                  tickFormatter={(value) => value.split('-')[0]}
                  type="category"
                  allowDuplicatedCategory={false}
                />
                <YAxis orientation="left" tick={{ fill: '#fff' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="repliesCount" stroke="#8884d8" strokeWidth={5} dot={{ fill: '#fff' }}>
                  <Dot strokeWidth={3} />
                </Line>
              </LineChart>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}

export default RepliesStat;
