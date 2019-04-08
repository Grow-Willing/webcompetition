import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'
import { message } from 'antd';
export default class index extends Component {
    componentDidMount = () => {
        let oli=document.querySelectorAll(".nav-ul li"),
        len=oli.length;
        for(let i=0;i<len;i++){
                if(i==3){
                    oli[i].onclick=()=>{let x=document.getElementById("uploadbutton");
                    if(x) {
                        x.click();
                    }else{
                        if(sessionStorage.getItem("userid")){
                            message.info(`当前目录无法上传，请更换目录哦_(:3」∠)_`);
                        }else{
                            message.info(`登陆后才能上传文件哦`);
                        }
                    }
                    return false;
                };
            }
        }
    }
    render() {
        return (
            <div className="nav">
                <ul className="nav-ul">
                    <li><NavLink to="/" exact activeClassName="on">WELCOME</NavLink></li>
                    <li><NavLink to="/全部文件/理科" activeClassName="on">理工科资料下载处</NavLink></li>
                    <li><NavLink to="/全部文件/文科" activeClassName="on">文科资料下载处</NavLink></li>
                    <li><a href="javascript:void();">学习资料上传</a></li>
                    <li><NavLink to="/help" activeClassName="on">疑问解答</NavLink></li>
                </ul>
            </div>
        )
    }
}
