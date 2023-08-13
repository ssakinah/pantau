import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'auth/AuthContext';
import axios from 'axios'; 
import moment from 'moment';
import { Card, CardHeader, Table, Badge, CardFooter } from 'reactstrap';

export default function RecentTweetList() {
    const { isLoggedIn, userName } = useContext(AuthContext);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        getTweets();
    }, []);

    const getTweets = async () => {
        const response = await axios.get('http://localhost:5000/tweets');
        setTweets(response.data);
    };

    const sentimentToBadgeClass = (sentiment) => {
        const lowercaseSentiment = sentiment.toLowerCase();

        if (lowercaseSentiment === 'positive') {
            return 'success';
        } else if (lowercaseSentiment === 'negative') {
            return 'danger';
        } else {
            return 'info';
        }
    };

    return (
        <>
            <Card className="shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-3">Recent Tweets</h3>
                </CardHeader>
                <div style={{ overflowX: 'auto' }}>

                </div>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th style={{ minWidth: '80px' }}>Number</th>
                            <th style={{ minWidth: '200px' }}>Tweets</th>
                            <th style={{ minWidth: '160px' }}>DateTime</th>
                            <th style={{ minWidth: '80px' }}>RT</th>
                            <th style={{ minWidth: '80px' }}>Likes</th>
                            <th style={{ minWidth: '120px' }}>Sentiment</th>
                        </tr>
                    </thead>
                    <tbody>

                        {isLoggedIn &&
                            tweets
                                .filter((tweet) => tweet.username === userName)
                                .sort((a, b) => moment(b.dateTime, 'YYYY-MM-DD HH:mm:ssZ').toDate() - moment(a.dateTime, 'YYYY-MM-DD HH:mm:ssZ').toDate())
                                .slice(0, 10) // Limit to the first 10 items
                                .map((tweets, index) => (
                                    <tr key={tweets.id}>
                                        <td>{index + 1}</td>
                                        <td style={{ whiteSpace: 'pre-wrap' }}>{tweets.tweets}</td>
                                        <td>{moment(tweets.dateTime, ['DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ssZ']).format('YYYY-MM-DD HH:mm')}</td>
                                        <td>{tweets.rt}</td>
                                        <td>{tweets.likes}</td>
                                        <td>
                                            <Badge color={sentimentToBadgeClass(tweets.sentiment)} pill>
                                                {tweets.sentiment}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
                <CardFooter className="py-4"></CardFooter>
            </Card>
        </>
    )
}
