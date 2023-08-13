import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'auth/AuthContext';
import axios from 'axios';
import moment from 'moment';
import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Button,
    Label,
    Input
} from "reactstrap";

const MentionsList = () => {
    const { isLoggedIn, userName } = useContext(AuthContext);
    const [mentioned, setMentioned] = useState([]);
    const [selectedSentiment, setSelectedSentiment] = useState('all');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getMentioned();
    }, []);

    const getMentioned = async () => {
        const response = await axios.get('http://localhost:5000/mentioned');
        setMentioned(response.data);
    };

    const getStyleBasedOnSentiment = (sentiment) => {
        if (sentiment.toLowerCase() === 'positive') {
            return { backgroundColor: 'lightgreen' };
        } else if (sentiment.toLowerCase() === 'negative') {
            return { backgroundColor: 'lightcoral' };
        } else {
            return {};
        }
    };

    const handleSentimentFilterChange = (event) => {
        setSelectedSentiment(event.target.value);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value));
    };

    const filteredMentioned = selectedSentiment === 'all' ? mentioned : mentioned.filter((mentioned) => mentioned.sentiment.toLowerCase() === selectedSentiment);

    const constructTweetURL = (tweetId, username) => {
        return `https://twitter.com/${username}/status/${tweetId}`;
    };
    return (
        <Card className="shadow">
            <CardHeader className="border-0">
                <h3 className="mb-3">Mentions</h3>
                <div className="row">
                    <div className="col">
                        <Input id="sentiment-filter" type="select" name="select" value={selectedSentiment} onChange={handleSentimentFilterChange}>
                            <option value="all">Sentiment Filter</option>
                            <option value="positive">Positive</option>
                            <option value="negative">Negative</option>
                            <option value="neutral">Neutral</option>
                        </Input>
                    </div>
                    <div className="col">
                        <Input id="rows-per-page" type="select" name="select" value={rowsPerPage} onChange={handleRowsPerPageChange}>
                            <option value={10}>10 Results per Page</option>
                            <option value={50}>50 Results per Page</option>
                            <option value={100}>100 Results per Page</option>
                        </Input>
                    </div>
                </div>
            </CardHeader>
            <div style={{ overflowX: 'auto' }}>

            </div>
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        {/* <th scope="col">Number</th>
                        <th scope="col">Username</th>
                        <th scope="col">Tweets</th>
                        <th scope="col">DateTime</th>
                        <th scope="col">RT</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Sentiment</th>
                        <th scope="col">Link</th> */}
                        <th>Number</th>
                        <th>Username</th>
                        <th>Tweets</th>
                        <th>DateTime</th>
                        <th>RT</th>
                        <th>Likes</th>
                        <th>Sentiment</th>
                        <th>Link</th>
                        {/* <th>Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {isLoggedIn &&
                        filteredMentioned
                            .filter((mentioned) => mentioned.bank === userName)
                            .sort((a, b) => moment(b.dateTime, ['DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ssZ']).toDate() - moment(a.dateTime, ['DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ssZ']).toDate())
                            .slice(0, rowsPerPage)
                            .map((mentioned, index) => (
                                <tr key={mentioned.id} style={getStyleBasedOnSentiment(mentioned.sentiment)}>
                                    <td>{index + 1}</td>
                                    <td>{mentioned.username}</td>
                                    <td style={{ whiteSpace: 'pre-wrap' }}>{mentioned.tweets}</td>
                                    <td>{moment(mentioned.dateTime, ['DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ssZ']).format('YYYY-MM-DD HH:mm')}</td>
                                    <td>{mentioned.rt}</td>
                                    <td>{mentioned.likes}</td>
                                    <td>{mentioned.sentiment}</td>
                                    <td>
                                        <Button
                                            aria-pressed={true}
                                            className="active"
                                            color="primary"
                                            href={constructTweetURL(mentioned.tweetsID, mentioned.username)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            role="button"
                                            size="sm"
                                        >
                                            Reply
                                        </Button>
                                    </td>
                                    {/* <td style={{ textAlign: 'center' }}>
                                        <Label check style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Input type="checkbox" style={{ transform: 'scale(1.5)' }} />
                                        </Label>
                                    </td> */}
                                </tr>
                            ))}
                </tbody>
            </Table>
            <CardFooter className="py-4"></CardFooter>
        </Card>
    );
};

export default MentionsList;
