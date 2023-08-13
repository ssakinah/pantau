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
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";

import DashCard from "components/Headers/DashCard";
import MentionsStat from "items/MentionsStat";
import RepliesStat from "items/RepliesStat";
import SentimentPieChart from "items/SentimentStat";
import Ranking from "items/Ranking";
import TopTweetList from "items/TopTweetList";
import RecentTweetList from "items/RecentTweetList";

const Index = () => {
  // const [activeNav, setActiveNav] = useState(1);
  // const [chartExample1Data, setChartExample1Data] = useState("data1");

  // if (window.Chart) {
  //   parseOptions(Chart, chartOptions());
  // }

  // const toggleNavs = (e, index) => {
  //   e.preventDefault();
  //   setActiveNav(index);
  //   setChartExample1Data("data" + index);
  // };
  return (
    <>
      {/* <Header /> */}
      <DashCard />

      {/* Page content */}
      <Container className="mt--7" fluid>

        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <MentionsStat />
            {/* <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6> 
                    {/* <h2 className="text-white mb-0">Number of Mentions Received</h2>
                  </div> 
                {/* </Row>
              </CardHeader>
              <CardBody>
                {/* Chart 
                <MentionsStat />
              </CardBody>
            </Card> */}
          </Col>
          <Col xl="4">
            <Card className="shadow-dark-lg border-light-lg">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6> */}
                    <h2 className="mb-0">Sentiment Analysis</h2>
                    {/* <p>pie chart yaaa</p> */}
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <SentimentPieChart />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            {/* <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="text-white mb-0">Number of Replies Received</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <RepliesStat />
              </CardBody>
            </Card> */}
            <RepliesStat />
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Brands Ranking</h3>
                  </div>
                  {/* <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div> */}
                </Row>
              </CardHeader>
              <Ranking />
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <div className="col">
            <RecentTweetList />
          </div>
        </Row>

        <Row className="mt-5">
          <div className="col">
            <TopTweetList />
          </div>
        </Row>

      </Container>
    </>
  );
};

export default Index;
