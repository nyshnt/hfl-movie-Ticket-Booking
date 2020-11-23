import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Axios from '../../axios';

export class GetCafeteriaDetail extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        this.listAllCafe();
    }

    listAllCafe = () => {
        const URl = "cafeteria/getCafeteriaDetails";
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
                        <h3>Cafe Details</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Cafe ID</th>
                                    <th>Soda</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data?.length >= 0
                                    ? this.state.data?.map((item, index) => <tr key={index}>
                                        <td>{item.CafeId}</td>
                                        <td>{item.Soda}</td>
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
export default GetCafeteriaDetail
