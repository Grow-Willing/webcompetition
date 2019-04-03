import React, { Component } from 'react'
import Logined from './logined/index'
import Unlogined from './unlogined/index'
export default class index extends Component {
    render() {
        return (
            <div style={{width:"100%",height:"100%",opacity:0.8,boxShadow: "0 3px 9px rgba(0,0,0,0.4)"}}>
                {
                    sessionStorage.getItem("userid")&&<Logined/>||<Unlogined/>
                }
            </div>
        )
    }
}
