import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import {NavLink} from 'react-router-dom'
import "./index.css"
export default class index extends Component {
    render() {
        let srcurl=decodeURIComponent(window.location.hash).replace("#/","/").split("/");
        srcurl.shift();
        let link="";
        return (
            <Breadcrumb className="bodyhead">
            {
                srcurl.length&&(
                    srcurl.map((item,index)=>{
                            link=link+"/"+item;
                            return (
                                <Breadcrumb.Item key={index}>
                                    <NavLink to={link}>
                                        {item}
                                    </NavLink>
                                </Breadcrumb.Item>
                            )
                        }
                    )
                )
            }
            </Breadcrumb>
        )
    }
}
