import React, { Component } from 'react'
import Usercenter from './usercenter//index'
import Out from './out/index'
import Login from './login/index'
import Reg from './reg'
import "./index.css"
export default class index extends Component {
    render() {
        if(sessionStorage.getItem("userid"))return (
            <div className="userstate">
                <Usercenter></Usercenter>
                <Out></Out>
            </div>
            
        )
        else
        return (
            <div className="userstate">
                <Login/>
                <Reg/>
            </div>
        )
    }
}
