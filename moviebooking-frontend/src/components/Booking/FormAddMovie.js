import React, { Component } from 'react';
import Axios from '../../axios';

export class FormAddMovie extends Component {
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
                console.log(res);
            })
            .catch(err => {
                const error = err.response?.data?.errors.message;
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add Cafeteria Details</h3>
                <div className="group">
                    <label htmlFor>Cafeteria ID</label>
                    <input type="number" name="cafeId" onChange={this.handleChange} placeholder="Enter Movie Id" required />
                </div>
                <div className="group">
                    <label htmlFor>Soda</label>
                    <input type="text" name="soda" onChange={this.handleChange} placeholder="Enter Movie Name" required />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button type="submit" className="btn">Add Cafeteria</button>
                </div>
            </form>
        )
    }
}

export default FormAddMovie
