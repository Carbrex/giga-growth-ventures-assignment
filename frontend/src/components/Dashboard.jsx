// import "./styles.css";
import { useState } from "react";
import { redirect } from "react-router-dom";
import './Dashboard.css';
import axios from 'axios';

function Dashboard({ user, REACT_APP_API_URL }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [stockPrice, setStockPrice] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const today = new Date();

    const getOrdinalSuffix = (day) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = day % 100;
        return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const getMonthName = (month) => {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[month];
    };

    const formattedDate = `${getOrdinalSuffix(today.getDate())} ${getMonthName(today.getMonth())}`;


    const subject = `Stock Price on ${formattedDate}`;

    const fetchStockPrice = async () => {
        setIsFetching(true);
        const options = {
            method: 'GET',
            url: 'https://yahoo-finance127.p.rapidapi.com/price/^NSEI',
            headers: {
                'X-RapidAPI-Key': 'b06804a21emsh07d35c1d80bb91fp13ebddjsne48b5c0250cf',
                'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setStockPrice(response.data.regularMarketPrice.raw);
            setIsFetching(false);
        } catch (error) {
            console.error(error);
        }
    };

    const copyToClipboard = async () => {
        const text = `The ${subject} is ${stockPrice}`;
        navigator.clipboard.writeText(text);
        setSuccessMessage('Copied to Clipboard. You can now paste it in WhatsApp!');
        setTimeout(() => {
            setSuccessMessage('');
        }, 1500);
    };

    const logout = () => {
        window.open(`${REACT_APP_API_URL}/auth/logout`, "_self");
    };
    return (
        <div className="container">
            <h1 className="heading">Dashboard</h1>
            <div className="card">
                <h2 className="dashboard-heading">Profile</h2>
                <img
                    src={user.picture}
                    alt="profile"
                    className="profile_img"
                />
                <p>{user.name}</p>
                <p>{user.email}</p>
                {
                    isFetching ?
                        <p>Fetching...</p>
                        :
                    stockPrice ?
                        <>
                            <p>{subject} is {stockPrice}</p>

                            <a href={`mailto:?subject=${subject}&body=The${subject} is ${stockPrice}`} className="btn fetch-btn">Share via Email</a>
                            {successMessage && <p>{successMessage}</p>}
                            <button type="button" className="btn fetch-btn" onClick={copyToClipboard}>Share via WhatsApp</button>
                        </>
                        :
                        <>
                            <p>Click button to get stock price</p>
                            <button className="btn fetch-btn" onClick={fetchStockPrice}>
                                Fetch price
                            </button>
                        </>
                }
                <button className="btn" onClick={logout}>
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
