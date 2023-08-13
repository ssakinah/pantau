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
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'auth/AuthContext';

const DashCard = () => {
  const { isLoggedIn, userName} = useContext(AuthContext);
  const [bankData, setBankData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/ors')
      .then((response) => response.json())
      .then((data) => {
        setBankData(data);
      })
      .catch((error) => {
        console.error('Error fetching bank data:', error);
      });
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">

        <Container fluid>
          {isLoggedIn ? (
            <div className="header-body">
              {/* Card stats */}
              <Row className="mb-4">
                <Col lg="4" xl="4" className="mb-4 mb-xl-0">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Reputation Score
                          </CardTitle>
                          {bankData.find((bank) => bank.bank === userName) && (
                            <span className="h2 font-weight-bold mb-0">
                              {bankData.find((bank) => bank.bank === userName).ors} %
                            </span>
                          )}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="4" className="mb-4 mb-xl-0">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Followers
                          </CardTitle>
                          {bankData.find((bank) => bank.bank === userName) && (
                            <span className="h2 font-weight-bold mb-0">
                              {bankData.find((bank) => bank.bank === userName).followers}
                            </span>)}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="4" className="mb-4 mb-xl-0">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Tweets
                          </CardTitle>
                          {bankData.find((bank) => bank.bank === userName) && (
                            <span className="h2 font-weight-bold mb-0">
                              {bankData.find((bank) => bank.bank === userName).totalTweets}
                            </span>)}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i class="fa-brands fa-twitter"></i>
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                    </CardBody>
                  </Card>
                </Col>

              </Row>
              <Row className="mb-4">
                <Col lg="4" xl="4" className="mb-4 mb-xl-0">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Likes
                          </CardTitle>
                          {bankData.find((bank) => bank.bank === userName) && (
                            <span className="h2 font-weight-bold mb-0">
                              {bankData.find((bank) => bank.bank === userName).totalLikes}
                            </span>
                          )}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i class="fa-solid fa-heart" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="4" className="mb-4 mb-xl-0">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Retweets
                          </CardTitle>
                          {bankData.find((bank) => bank.bank === userName) && (
                            <span className="h2 font-weight-bold mb-0">

                              {bankData.find((bank) => bank.bank === userName).totalRT}

                            </span>)}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                            <i class="fa-solid fa-retweet" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="4" className="mb-4 mb-xl-0">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Sentiment Score
                          </CardTitle>


                          {bankData.find((bank) => bank.bank === userName) && (
                            <>
                              <span className="h2 font-weight-bold mb-0">
                                {bankData.find((bank) => bank.bank === userName).sentimentScore}
                              </span>
                              <span className="text-nowrap">
                                {bankData.find((bank) => bank.bank === userName).sentimentScore < 5
                                  ? ' (Negative)'
                                  : bankData.find((bank) => bank.bank === userName).sentimentScore > 5
                                    ? ' (Positive)'
                                    : ' (Neutral)'}
                              </span>
                            </>
                          )}
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i class="fa-solid fa-star" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Negative</span>
                    </p> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : null}
        </Container>
      </div>
    </>
  );
};

export default DashCard;
