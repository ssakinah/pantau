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

function MentionsStat() {
  const { userName } = useContext(AuthContext);
  const [tweetData, setTweetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/mentioned');
        const data = response.data;
        const myMaybankMentioned = data.filter((mentioned) => mentioned.bank === userName);
        const mentionedCounts = {};

        myMaybankMentioned.forEach((mentioned) => {
          const date = new Date(mentioned.dateTime);
          const currentMonth = new Date().getMonth() + 1; // Get the current month dynamically
          const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          if (date.getMonth() + 1 === currentMonth) {
            mentionedCounts[formattedDate] = (mentionedCounts[formattedDate] || 0) + 1;
          }
        });

        const sortedDates = Object.keys(mentionedCounts).sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateA - dateB;
        });

        const formattedData = sortedDates.map((date) => ({
          date,
          mentionedCount: mentionedCounts[date],
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
          {/* <Col className="mb-5 mb-xl-0" xl="8"> */}
          <Card className="bg-gradient-default shadow">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6> */}
                  <h2 className="text-white mb-0">Number of Mentions Received for {currentMonth} {currentYear}</h2>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              {/* Chart */}
              <LineChart width={830} height={350} data={tweetData} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#fff' }}
                  tickFormatter={(value) => value.split('-')[1]}
                  type="category"
                  allowDuplicatedCategory={false}
                />
                <YAxis orientation="left" tick={{ fill: '#fff' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mentionedCount" stroke="#8884d8" strokeWidth={5} dot={{ fill: '#fff' }}>
                  <Dot strokeWidth={3} />
                </Line>
              </LineChart>
            </CardBody>
          </Card>
          {/* </Col> */}
        </>
      )}
    </div>
  );
}

export default MentionsStat;
