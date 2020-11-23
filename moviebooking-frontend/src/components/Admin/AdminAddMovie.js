import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Axios from '../../axios';

export class AdminAddMovie extends Component {
    state = {
        movieId: '',
        movieName: '',
        noOfShows: '',
        schedule: '',
        auditorium: '',
        price: '',
        totalSeats: '',
    };

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
            methodName: "initMovie",
            userName: "test2",
            args: [this.state.movieId, this.state.movieName, this.state.noOfShows, this.state.schedule, this.state.auditorium, this.state.price, this.state.totalSeats]
        }
        const URl = "movie/addNewMovie";
        Axios.post(URl, body)
            .then(res => {
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
                <h1>Admin Work</h1>
                <div className="counter" style={{ justifyContent: 'flex-start' }}>
                    <ul>
                        <li>
                            <NavLink to="/addMovie" activeClassName="active">Add New Movie</NavLink>
                        </li>
                        <li>
                            <NavLink to="/addCafeteria" activeClassName="active">Add Cafeteria Details</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cafeDetails" activeClassName="active">Get Cafeteria Details</NavLink>
                        </li>
                        <li>
                            <NavLink to="/listAllMovies" activeClassName="active">List All Movies</NavLink>
                        </li>
                        <li>
                            <NavLink to="/listAllTickets" activeClassName="active">List All Tickets</NavLink>
                        </li>
                    </ul>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Add New Movie</h3>
                        <div className="group">
                            <label htmlFor>Movie ID</label>
                            <input type="text" name="movieId" onChange={this.handleChange} placeholder="Enter Movie Id" required />
                        </div>
                        <div className="group">
                            <label htmlFor>Movie Name</label>
                            <input type="text" name="movieName" onChange={this.handleChange} placeholder="Enter Movie Name" required />
                        </div>
                        <div className="group">
                            <label htmlFor>Number Of Shows</label>
                            <input type="text" name="noOfShows" onChange={this.handleChange} placeholder="Enter Number Of Shows" required />
                        </div>
                        <div className="group">
                            <label htmlFor>Schedule</label>
                            <input type="text" name="schedule" onChange={this.handleChange} placeholder="Enter Schedule" required />
                        </div>
                        <div className="group">
                            <label htmlFor>Auditorium</label>
                            <input type="text" name="auditorium" onChange={this.handleChange} placeholder="Enter Auditorium" required />
                        </div>
                        <div className="group">
                            <label htmlFor>Price</label>
                            <input type="text" name="price" onChange={this.handleChange} placeholder="Enter Price" required />
                        </div>
                        <div className="group">
                            <label htmlFor>Total Seats</label>
                            <input type="text" name="totalSeats" onChange={this.handleChange} placeholder="Enter Total Seats" required />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button className="btn">Add Movie</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default AdminAddMovie
