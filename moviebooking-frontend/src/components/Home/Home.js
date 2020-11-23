import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Home extends Component {
    render() {
        return (
            <>
                <div className="text-right">
                    <Link to="/addMovie">
                        <button className="btn">Admin</button>
                    </Link>
                </div>
                <h1>Movie Ticket Booking</h1>
                <div className="counter">
                    <Link to="/counter1">
                        <button className="btn1">Counter1</button>
                    </Link>
                    <Link to="/counter2">
                        <button className="btn1">Counter2</button>
                    </Link>
                    <Link to="/counter3">
                        <button className="btn1">Counter3</button>
                    </Link>
                    <Link to="/counter4">
                        <button className="btn1">Counter4</button>
                    </Link>
                </div>

            </>
        )
    }
}

export default Home
