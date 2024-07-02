import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

function App() {
    const [cryptoData, setCryptoData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/crypto');
                const data = response.data || [];
                setCryptoData(data);

                const labels = data.map(crypto => crypto.pair);
                const prices = data.map(crypto => crypto.price);
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Crypto Prices',
                            data: prices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Crypto Dashboard</h1>
            {error && <p className="error">{error}</p>}
            <ul>
                {cryptoData.length > 0 ? (
                    cryptoData.map((crypto) => (
                        <li key={crypto.pair}>
                            <span>{crypto.pair}</span>
                            <span>${crypto.price}</span>
                        </li>
                    ))
                ) : (
                    <li>Loading...</li>
                )}
            </ul>
            <div className="chart-container">
                {chartData.labels ? (
                    <Line data={chartData} />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        </div>
    );
}

export default App;
