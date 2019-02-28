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
            }else{
                oli[i].onclick=function(){
                    for(let j=0;j<len;j++){
                        if(j!==i) oli[j].className="";
                        else oli[j].className="on";
                    }
                    oli[i].firstChild.click();
                }
            }
        }
        let srcurl=decodeURIComponent(window.location.hash).split("/");
        if(srcurl[1]==""){
            oli[0].classList.add("on");
        }else if(srcurl[1]=="全部文件"){
            if(srcurl[2]=="理科"){
                oli[1].classList.add("on");
            }else if(srcurl[2]=="文科"){
                oli[2].classList.add("on");
            }
        }else if(srcurl[1]=="help"){
            oli[4].classList.add("on");
        }
    }
    render() {
        return (
            <div className="nav">
                <ul className="nav-ul">
                    <li><NavLink to="/">WELCOME</NavLink></li>
                    <li><NavLink to="/全部文件/理科">理工科资料下载处</NavLink></li>
                    <li><NavLink to="/全部文件/文科">文科资料下载处</NavLink></li>
                    <li><a href="javascript:void();">学习资料上传</a></li>
                    <li><NavLink to="/help">疑问解答</NavLink></li>
                </ul>
            </div>
        )
    }
}
