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
// reactstrap components
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  CardBody
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const BankCard = ({ bank }) => {
  return (
    <Card className="shadow border-0 mb-5">
      <CardHeader className="border-0">
        <h2 className="mb-0">{bank.bank}</h2>
      </CardHeader>
      <CardBody>
        <div className="mb-3">
          <span className="h3 font-weight-bold">Online Reputation Score:</span>
          <span className="h3 ml-2">{bank.ors}%</span>
        </div>
        <div className="mb-3">
          <span className="h3">Sentiment Score:</span>
          <span className="h3 ml-2">{bank.sentimentScore}</span>
        </div>
        <div className="mb-3">
          <span className="h3">Number of followers:</span>
          <span className="h3 ml-2">{bank.followers}</span>
        </div>
        <div className="mb-3">
          <span className="h3">Total Tweets:</span>
          <span className="h3 ml-2">{bank.totalTweets}</span>
        </div>
        <div className="mb-3">
          <span className="h3">Total Likes:</span>
          <span className="h3 ml-2">{bank.totalLikes}</span>
        </div>
        <div>
          <span className="h3">Total Retweets:</span>
          <span className="h3 ml-2">{bank.totalRT}</span>
        </div>
      </CardBody>
    </Card>
  );
};

const BankList = ({ banks }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredBanks = banks.filter((bank) =>
    bank.bank.toLowerCase().includes(searchKeyword.toLowerCase())
  ).sort((a, b) => b.ors - a.ors);

  return (
    <div>
      <Row>
        <div className="col">
          <Card className="shadow mb-5" style={{ height: '100px', border: 'none' }}>
            <CardBody>
              <Form>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-transparent border-0" style={{ fontSize: '20px' }}>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className="bg-transparent border-0"
                      placeholder="Find a Bank..."
                      type="text"
                      style={{ fontSize: '23px' }}
                      value={searchKeyword}
                      onChange={handleSearch}
                    />
                  </InputGroup>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Row>
      {/* Bank cards */}
      {filteredBanks.map((bank) => (
        <Row key={bank.bank}>
          <div className="col">
            <BankCard bank={bank} />
          </div>
        </Row>
      ))}
    </div> // Add closing tag here
  );
};

// Rest of the code





const Tables = () => {
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
      <Container className="mt--7" fluid>

        <BankList banks={banks} />
      </Container>
    </>
  );
};

export default Tables;
