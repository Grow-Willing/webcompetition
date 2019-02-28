import React, { Component } from 'react'
import {Divider} from 'antd'
import {NavLink} from 'react-router-dom'
import "./index.css"
export default class index extends Component {
    render() {
        let x=document.cookie?document.cookie.split("; "):[];
        return (
            <div className="historybox">
                <dl>
                    <dt><Divider style={{fontSize:"24px",color:"rgba(0,0,0,.4)"}}>我的下载历史</Divider></dt>
                    {
                        x.map((items,index)=>{
                            let ajson=items.split("=");
                            return (
                                <dd key={ajson[0]}>
                                    <NavLink to={ajson[0].replace("/"+ajson[1],"")}>
                                        {ajson[1]}
                                    </NavLink>
                                </dd>
                            )
                        })
                    }
                </dl>
            </div>
        )
    }
}
