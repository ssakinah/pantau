/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import React from "react";
import React, { useEffect, useState } from 'react';
// reactstrap components
import { Card, CardHeader, Container, Row, Input } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BankCard = ({ bank }) => {
  return (
    <Card className="shadow border-0 mb-5 ">
      <CardHeader className="border-0 ">
        <h2 className="mb-0">{bank.bank}</h2>
      </CardHeader>
      <span className="h3 font-weight-bold mb-3 ml-4">Online Reputation Score: {bank.ors}%</span>

      <span className="h3 mb-1 ml-4">Sentiment Score: {bank.sentimentScore}</span>
      <span className="h3 mb-1 ml-4">Number of followers: {bank.followers}</span>
      <span className="h3 mb-1 ml-4">Total Tweets: {bank.totalTweets}</span>
      <span className="h3 mb-1 ml-4">Total Likes: {bank.totalLikes}</span>
      <span className="h3 mb-4 ml-4">Total Retweets: {bank.totalRT}</span>
    </Card >
  );
};

const BankList = ({ banks }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBank1, setSelectedBank1] = useState(null);
  const [selectedBank2, setSelectedBank2] = useState(null);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredBanks = banks.filter((bank) =>
    bank.bank.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleBank1Select = (event) => {
    setSelectedBank1(event.target.value);
  };

  const handleBank2Select = (event) => {
    setSelectedBank2(event.target.value);
  };

  const bank1 = banks.find((bank) => bank.bank === selectedBank1);
  const bank2 = banks.find((bank) => bank.bank === selectedBank2);

  return (
    <>
      <Container className="mt--7" fluid>
        <Row className="mb-5">
          <div className="col-lg-6 mb-5 d-flex align-items-center justify-content-center">
            <div className="dropdown" style={{ width: "100%", maxWidth: "2000px" }}>
              {/* <label htmlFor="bank1">Select Bank:</label> */}
              <Input id="bank1" type="select" name="select" value={selectedBank1} onChange={handleBank1Select}>
                <option value="">Select Bank</option>
                {filteredBanks.map((bank) => (
                  <option key={bank.bank} value={bank.bank}>
                    {bank.bank}
                  </option>
                ))}
              </Input>
            </div>
          </div>
          <div className="col-lg-6 mb-5 d-flex align-items-center justify-content-center">
            <div className="dropdown" style={{ width: "100%", maxWidth: "2000px" }} >
              {/* <label htmlFor="bank2">Select Bank:</label> */}
              <Input id="bank2" type="select" name="select" value={selectedBank2} onChange={handleBank2Select}>
                <option value="">Select Bank</option>
                {filteredBanks.map((bank) => (
                  <option key={bank.bank} value={bank.bank}>
                    {bank.bank}
                  </option>
                ))}
              </Input>
            </div>
          </div>

          {bank1 && (
            <div className="col-lg-6">
              <BankCard bank={bank1} />
            </div>
          )}
          {bank2 && (
            <div className="col-lg-6">
              <BankCard bank={bank2} />
            </div>
          )}

          {bank1 && bank2 && (
              <ComparisonStat bank1={bank1} bank2={bank2} />
          )}
        </Row>
      </Container>
    </>

  );
};
const ComparisonStat = ({ bank1, bank2 }) => {
  const dataFollowers = [
    {
      name: "Number of Followers",
      [bank1.bank]: bank1.followers,
      [bank2.bank]: bank2.followers,
    }
  ];

  const dataTweets = [
    {
      name: "Total Tweets",
      [bank1.bank]: bank1.totalTweets,
      [bank2.bank]: bank2.totalTweets,
    }
  ];

  const dataLikes = [
    {
      name: "Total Likes",
      [bank1.bank]: bank1.totalLikes,
      [bank2.bank]: bank2.totalLikes,
    }
  ];

  const dataRetweets = [
    {
      name: "Total Retweets",
      [bank1.bank]: bank1.totalRT,
      [bank2.bank]: bank2.totalRT,
    }
  ];

  return (
    <Row className="mb-5">
      <div className="col-lg-6">
        <Card className="shadow border-0 mb-5 ">
          {/* <div className="card-body"> */}
          <CardHeader className="border-0">
            <h2 className="mb-0">Number of Followers</h2>
          </CardHeader>
          {/* <h5 className="card-title">Number of Followers</h5> */}
          <BarChart width={500} height={250} data={dataFollowers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={bank1.bank} fill="#8884d8" name={bank1.bank} />
            <Bar dataKey={bank2.bank} fill="#82ca9d" name={bank2.bank} />
          </BarChart>
          {/* </div> */}
        </Card>
      </div>
      <div className="col-lg-6">
        <Card className="shadow border-0 mb-5">
          {/* <div className="card-body"> */}
          <CardHeader className="border-0">
            <h2 className="mb-0">Total Tweets</h2>
          </CardHeader>
          {/* <h5 className="card-title">Total Tweets</h5> */}
          <BarChart width={500} height={250} data={dataTweets}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={bank1.bank} fill="#8884d8" name={bank1.bank} />
            <Bar dataKey={bank2.bank} fill="#82ca9d" name={bank2.bank} />
          </BarChart>
          {/* </div> */}
        </Card>
      </div>
      <div className="col-lg-6">
        <Card className="shadow border-0 mb-5">
          {/* <div className="card-body"> */}
          <CardHeader className="border-0">
            <h2 className="mb-0">Total Likes</h2>
          </CardHeader>
          {/* <h5 className="card-title"></h5> */}
          <BarChart width={500} height={250} data={dataLikes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={bank1.bank} fill="#8884d8" name={bank1.bank} />
            <Bar dataKey={bank2.bank} fill="#82ca9d" name={bank2.bank} />
          </BarChart>
          {/* </div> */}
        </Card>
      </div>
      <div className="col-lg-6">
        <Card className="shadow border-0 mb-5">
          {/* <div className="card-body"> */}
          <CardHeader className="border-0">
            <h2 className="mb-0">Total Retweets</h2>
          </CardHeader>
          {/* <h5 className="card-title"></h5> */}
          <BarChart width={500} height={250} data={dataRetweets}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={bank1.bank} fill="#8884d8" name={bank1.bank} />
            <Bar dataKey={bank2.bank} fill="#82ca9d" name={bank2.bank} />
          </BarChart>
          {/* </div> */}
        </Card>
      </div>
    </Row>
  );
};
const Compare = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/ors')
      .then((response) => response.json())
      .then((data) => {
        setBanks(data);
      })
      .catch((error) => {
        console.error('Error fetching bank data:', error);
      });
  }, []);
  return (
    <>
      <Header />
      {/* Page content */}
      <BankList banks={banks} />
    </>
  );
};

export default Compare;
