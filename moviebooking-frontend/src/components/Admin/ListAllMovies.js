import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Axios from '../../axios';

export class ListAllMovies extends Component {
    state = {
        data: []
    };
    componentDidMount() {
        this.listAllMovies();
    }

    listAllMovies = () => {
        const URl = "movie/listAllMovies";
        Axios.get(URl)
            .then(res => {
                const list = res.data.data;
                this.setState({
                    data: list
                })

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
                    <div className="tabledata">
                        <h3>Add New Movie</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Movie Name</th>
                                    <th>No Of Shows</th>
                                    <th>Schedule</th>
                                    <th>Auditorium</th>
                                    <th>Price</th>
                                    <th>Total Seats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data?.length >= 0
                                    ? this.state.data?.map((item, index) => <tr key={index}>
                                        <td>{item.MovieId}</td>
                                        <td>{item.MovieName}</td>
                                        <td>{item.NumberOfShows}</td>
                                        <td>{item.Schedule}</td>
                                        <td>{item.Auditorium}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.TotalSeats}</td>
                                    </tr>)
                                    : <tr>
                                        <td colSpan="3">No Data</td>
                                    </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}

export default ListAllMovies
