import React, { Component } from 'react';
import classes from './App.css';
import * as APIConfig from './APIConfig';

class App extends Component {

    constructor(){
        super();
        this.state = {
            userData: null
        }
    }

    componentDidMount(){
        this.initUserData();
    }

    initUserData = () =>{
        let request = new XMLHttpRequest();

        request.onreadystatechange = (e) => {
            if(request.status === 200) {
                let data = JSON.parse(request.responseText);
                this.setState({userData: data});
            } else {
                console.log('Error in API');
            }
        }

        request.open('GET', APIConfig.API_BASE_PATH + '/users');
        request.send();

    }

    render() {
        let userDetails = (
            <tr style={{textAlign: 'center'}}>
                <td colSpan="2">
                    NA
                </td>
            </tr>
        )
        let userData = this.state.userData;
        if(userData && userData.length > 0) {
            userDetails = (
                userData.map(user => {
                    return (
                        <tr id={user.id}>
                            <td>
                                { user.name }
                            </td>
                            <td>
                                { user.email }
                            </td>
                        </tr>
                    )
                })
            )
        }
        return (
            <div>
                <table align="center" className={classes.UserTable}>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { userDetails }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App;