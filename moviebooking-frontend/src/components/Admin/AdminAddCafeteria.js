import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Axios from '../../axios';

export class AdminAddCafeteria extends Component {
    state = {
        cafeId: '',
        soda: ''
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
            methodName: "initCafeteria",
            userName: "test2",
            args: [this.state.cafeId, this.state.soda]
        }
        const URl = "cafeteria/addCafeDetails";
        Axios.post(URl, body)
            .then(res => {
                alert(res.data.message);
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
                        <h3>Add Cafeteria Details</h3>
                        <div className="group">
                            <label htmlFor>Cafeteria ID</label>
                            <input type="text" name="cafeId" onChange={this.handleChange} placeholder="Enter Cafeteria Id" required />
                        </div>
                        <div className="group">
                            <label htmlFor>Soda</label>
                            <input type="text" name="soda" onChange={this.handleChange} placeholder="Enter number of sodas" required />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button type="submit" className="btn">Add Cafeteria</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default AdminAddCafeteria
