import React, { Component } from 'react'
import './index.css'
export default class index extends Component {
    render() {
        return (
            <div className="welcome">
                <div className="wc1">欢迎我们</div>
                <div className="wc1">亲爱的 <span style={{fontSize:"50px"}}>{atob(sessionStorage.getItem("userid"))}</span></div>
                <div className="wc1">的到来<br/></div>
                <div className="wc2">让读书</div>
                <div className="wc2">成为习惯</div> 
            </div>
        )
    }
}
