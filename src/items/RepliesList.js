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

const RepliesList = () => {
    const { isLoggedIn, userName } = useContext(AuthContext);
    const [replies, setReplies] = useState([]);
    const [selectedSentiment, setSelectedSentiment] = useState('all');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getReplies();
    }, []);

    const getReplies = async () => {
        const response = await axios.get('http://localhost:5000/replies');
        setReplies(response.data);
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

    const filteredReplies = selectedSentiment === 'all' ? replies : replies.filter((reply) => reply.sentiment.toLowerCase() === selectedSentiment);

    return (
        <Card className="shadow">
            <CardHeader className="border-0">
                <h3 className="mb-3">Replies</h3>
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
                        {/* <th scope="col">Project</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Status</th>
                    <th scope="col">Users</th>
                    <th scope="col">Completion</th>
                    <th scope="col" />*/}
                        {/* <th scope="col">Number</th>
                        <th scope="col">Username</th>
                        <th scope="col">Tweets</th>
                        <th scope="col">DateTime</th>
                        <th scope="col">RT</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Sentiment</th>
                        <th scope="col">Link</th> */}
                        <th style={{ minWidth: '80px' }}>Number</th>
                        <th style={{ minWidth: '120px' }}>Username</th>
                        <th style={{ minWidth: '200px' }}>Tweets</th>
                        <th style={{ minWidth: '160px' }}>DateTime</th>
                        <th style={{ minWidth: '80px' }}>RT</th>
                        <th style={{ minWidth: '80px' }}>Likes</th>
                        <th style={{ minWidth: '120px' }}>Sentiment</th>
                        <th style={{ minWidth: '120px' }}>Link</th>
                        {/* <th style={{ minWidth: '80px' }}>Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {isLoggedIn &&
                        filteredReplies
                            .filter((reply) => reply.bank === userName)
                            .sort(
                                (a, b) =>
                                    moment(b.dateTime, ['DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ssZ']).toDate() -
                                    moment(a.dateTime, ['DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ssZ']).toDate()
                            )
                            .slice(0, rowsPerPage)
                            .map((reply, index) => (
                                <tr key={reply.id} style={getStyleBasedOnSentiment(reply.sentiment)}>
                                    <td>{index + 1}</td>
                                    <td>{reply.username}</td>
                                    <td style={{ whiteSpace: 'pre-wrap' }}>{reply.reply}</td>
                                    <td>{moment(reply.dateTime, ['DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ssZ']).format('YYYY-MM-DD HH:mm')}</td>
                                    <td>{reply.rt}</td>
                                    <td>{reply.likes}</td>
                                    <td>{reply.sentiment}</td>
                                    <td>
                                        <Button
                                            aria-pressed={true}
                                            className="active"
                                            color="primary"
                                            href={reply.replyURL}
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

export default RepliesList;
