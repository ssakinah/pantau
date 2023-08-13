import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'auth/AuthContext';
import axios from 'axios';
import moment from 'moment';
import { Input, Card, CardHeader, Table, Badge, CardFooter } from 'reactstrap';

export default function TopTweetList() {
    const { isLoggedIn, userName } = useContext(AuthContext);
    const [tweets, setTweets] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('week');

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

    const filterAndSortTweets = (tweets) => {
        let filteredTweets = tweets.filter((tweet) => tweet.username === userName);

        const currentMonth = moment().format('MM');
        const currentYear = moment().format('YYYY');

        if (selectedFilter === 'week') {
            filteredTweets = filteredTweets.filter((tweet) => moment(tweet.dateTime, 'YYYY-MM-DD HH:mm:ssZ').isSameOrAfter(moment().subtract(1, 'weeks')));
        } else if (selectedFilter === 'month') {
            if (moment().date() <= 15) {
                filteredTweets = filteredTweets.filter((tweet) => moment(tweet.dateTime, 'YYYY-MM-DD HH:mm:ssZ').isSameOrAfter(moment(`${currentYear}-${currentMonth}-01`, 'YYYY-MM-DD')));
            } else {
                filteredTweets = filteredTweets.filter((tweet) => moment(tweet.dateTime, 'YYYY-MM-DD HH:mm:ssZ').isSameOrAfter(moment().subtract(1, 'months')));
            }
        } else if (selectedFilter === 'year') {
            filteredTweets = filteredTweets.filter((tweet) => moment(tweet.dateTime, 'YYYY-MM-DD HH:mm:ssZ').isSameOrAfter(moment(`${currentYear}-01-01`, 'YYYY-MM-DD')));
        }

        const sortedTweets = filteredTweets.sort((a, b) => {
            if (a.likes === b.likes) {
                return moment(b.dateTime, 'YYYY-MM-DD HH:mm:ssZ').toDate() - moment(a.dateTime, 'YYYY-MM-DD HH:mm:ssZ').toDate();
            }
            return b.likes - a.likes;
        });

        return sortedTweets;
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const filteredAndSortedTweets = filterAndSortTweets(tweets);
    return (
        <>
            <Card className="shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-3">Top Tweets</h3>
                    <div className="filter-container">
                        <Input id="filter-select" type="select" name="select" value={selectedFilter} onChange={handleFilterChange}>
                            <option value="week">Filter by: Week</option>
                            <option value="month">Filter by: Month</option>
                            <option value="year">Filter by: Year</option>
                        </Input>
                    </div>
                </CardHeader>
                <div style={{ overflowX: 'auto' }}>

                </div>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th style={{ minWidth: '80px' }}>Number</th>
                            <th style={{ minWidth: '200px' }}>Tweets</th>
                            
                            <th style={{ minWidth: '80px' }}>RT</th>
                            <th style={{ minWidth: '80px' }}>Likes</th>
                            <th style={{ minWidth: '120px' }}>Sentiment</th>
                            <th style={{ minWidth: '160px' }}>DateTime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoggedIn &&
                        filteredAndSortedTweets
                            .slice(0, 10)
                            .map((tweets, index) => (
                                <tr key={tweets.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ whiteSpace: 'pre-wrap' }}>{tweets.tweets}</td>
                                    
                                    <td>{tweets.rt}</td>
                                    <td>{tweets.likes}</td>
                                    <td>
                                        <Badge color={sentimentToBadgeClass(tweets.sentiment)} pill>
                                            {tweets.sentiment}
                                        </Badge>
                                    </td>
                                    <td>{moment(tweets.dateTime, ['DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ssZ']).format('YYYY-MM-DD HH:mm')}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <CardFooter className="py-4"></CardFooter>
            </Card>
        </>
    )
}
