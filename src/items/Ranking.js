// import React from 'react';
import { Table } from "reactstrap";
import React, { useState, useEffect } from 'react';

export default function Ranking() {
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
        <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
                <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Brands</th>
                    <th scope="col">Reputation Score</th>
                    {/* <th scope="col" /> */}
                </tr>
            </thead>
            <tbody>
                {banks
                .slice(0, 7)
                .sort((a, b) => b.ors - a.ors)
                .map((bank, index) => (
                    <tr key={bank.id}>
                        <td>{index + 1}</td>
                        <th scope="row">{bank.bank}</th>
                        <td>
                            <div className="d-flex align-items-center">
                                <span className="mr-2">{bank.ors}%</span>
                                {/* <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div> */}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
