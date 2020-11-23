import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from '../../axios';

export class Booking extends Component {
    state = {
        movieId: '',
        schedule: '',
        seats: '',
        cafeId: '',
        ticketId: '',
        path: false,
        status: 1,
    };

    handleSelect = (val, e) => {
        e.preventDefault();
        this.setState({
            status: val
        })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            contractName: "ticket-booking",
            channelName: "mychannel",
            methodName: "bookMovie",
            userName: "test2",
            args: [this.state.movieId, this.state.schedule, this.state.seats]
        }
        const URl = "ticket/bookTicket";
        Axios.post(URl, body)
            .then(res => {
                console.log(res);
                alert(res.data.message)
            })
            .catch(err => {
                const error = err.response?.data?.errors.message;
                console.log(error)

            })
    }

    handleSubmit1 = (event) => {
        event.preventDefault();
        const body = {
            contractName: "ticket-booking",
            channelName: "mychannel",
            methodName: "getTicketDetails",
            userName: "test2",
            args: [this.state.ticketId]
        }
        const URl = "ticket/queryTicketDetail";
        Axios.post(URl, body)
            .then(res => {
                console.log(res);
                alert(res.data.message)

            })
            .catch(err => {
                const error = err.response?.data?.errors.message;
                console.log(error)

            })
    }

    handleSubmit2 = (event) => {
        event.preventDefault();
        const body = {
            contractName: "ticket-booking",
            channelName: "mychannel",
            methodName: "exchangeWaterWithSoda",
            userName: "test2",
            args: [this.state.cafeId, this.state.ticketId]
        }
        const URl = "ticket/exchangeWaterWithSoda";
        Axios.post(URl, body)
            .then(res => {
                console.log(res);
                alert(res.data.message)
            })
            .catch(err => {
                const error = err.response?.data?.errors.message;
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                <div className="text-right">
                    <Link to="">
                        <button className="btn">Dashboard</button>
                    </Link>
                </div>
                <h1>Booking</h1>
                <div className="counter" style={{ justifyContent: 'flex-start' }}>
                    <ul>
                        <li>
                            <a href="/#" onClick={(event) => this.handleSelect(1, event)} className={this.state.status === 1 ? "active" : ''}>Book Movie</a>
                        </li>
                        <li>
                            <a href="/#" onClick={(event) => this.handleSelect(2, event)} className={this.state.status === 2 ? "active" : ''}>Get Ticket Details</a>
                        </li>
                        <li>
                            <a href="/#" onClick={(event) => this.handleSelect(3, event)} className={this.state.status === 3 ? "active" : ''}>Exchange Water With Soda</a>
                        </li>
                    </ul>
                    {this.state.status === 1
                        ? <form onSubmit={this.handleSubmit}>
                            <h3>Book Movie</h3>
                            <div className="group">
                                <label htmlFor>Movie Id</label>
                                <input type="text" name="movieId" onChange={this.handleChange} placeholder="Enter Movie Id" required />
                            </div>
                            <div className="group">
                                <label htmlFor>Schedule</label>
                                <input type="text" name="schedule" onChange={this.handleChange} placeholder="Enter Schedule" required />
                            </div>
                            <div className="group">
                                <label htmlFor>Seats</label>
                                <input type="text" name="seats" onChange={this.handleChange} placeholder="Enter number of seats" required />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button type="submit" className="btn">Book Movie</button>
                            </div>
                        </form> : null}
                    {this.state.status === 2
                        ? <form onSubmit={this.handleSubmit1}>
                            <h3>Get Ticket Details</h3>
                            <div className="group">
                                <label htmlFor>Ticket Id</label>
                                <input type="text" name="ticketId" onChange={this.handleChange} placeholder="Enter Ticket Id" required />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button type="submit" className="btn">Get Details</button>
                            </div>
                        </form> : null}
                    {this.state.status === 3
                        ? <form onSubmit={this.handleSubmit2}>
                            <h3>Exchange Water With Soda</h3>
                            <div className="group">
                                <label htmlFor>Cafeteria ID</label>
                                <input type="text" name="cafeId" onChange={this.handleChange} placeholder="Enter Cafe Id" required />
                            </div>
                            <div className="group">
                                <label htmlFor>Ticket Id</label>
                                <input type="text" name="ticketId" onChange={this.handleChange} placeholder="Enter Ticket Id" required />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button type="submit" className="btn">Exchange</button>
                            </div>
                        </form> : null}
                </div>
            </div>
        )
    }
}

export default Booking
