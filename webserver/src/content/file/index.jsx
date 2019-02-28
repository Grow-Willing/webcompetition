import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import Notfind from './404/index.jsx'
import Download from '../../download/index'
import {notification,Tooltip} from 'antd'
import "./index.css"
import background from '../../static/background.png'
export default class index extends Component {
    state={
        srcurl:"",
        filelist:{}
    }
    componentDidMount = () => {
        this.getlist();
    }
    
    download=(src,name)=>{//文件下载并重命名
        notification.warn({
            key:src+name,
            message: `文件下载`,
            description: `正在下载"${name}"`,
            placement:"bottomRight",
            duration:0
        });
        let srcurl=decodeURIComponent(window.location.hash.replace("#/","/"));
        document.cookie=`${srcurl+"/"+name}=${name};max-age=259200`;
        fetch(src).then(
            Response=>Response.blob()
        ).then(
            data=>{
                let url=window.URL.createObjectURL(data);
                let a=document.createElement("a");
                a.download=name;
                a.href=url;
                a.click();
                notification.success({
                    key:src+name,
                    message: `文件下载`,
                    description:`下载"${name}"完成，正在保存`,
                    placement:"bottomRight"
                })
            }
        );
    }

    getlist=()=>{
        let srcurl=decodeURIComponent(window.location.hash).replace("#/","/");
        if(this.state.srcurl!==srcurl){
            let filelist;
            fetch(`http://localhost:3005/file/get?url=${srcurl}`).then(
                Response=>Response.json()
            ).then(
                data=>{
                    filelist=data;
                    this.setState({
                        srcurl,
                        filelist
                    })
                }
            ); 
        }
    }
    render() {
        this.getlist();
        return (
            <ul style={{
                    backgroundImage:`url(${background})`,
                    backgroundRepeat:"no-repeat",
                    backgroundSize:"auto 100%",
                    backgroundPositionX:"50%",
                    height:"calc(100% - 44px)",
                    margin:0,
                    padding:"10px 5px 0 5px",
                    overflowY:"auto"
                }}>
                {
                    this.state.filelist.list&&this.state.filelist.list.map(
                        (item,index)=>{
                            return (
                                <li key={index}>
                                {
                                    this.state.filelist.type[index]&&(//显示文件
                                        <Tooltip title="点击打开文件夹" placement="topLeft" mouseEnterDelay={0.5}>
                                            <NavLink
                                                to={decodeURIComponent(window.location.hash).replace("#/","/")+"/"+item}
                                                className={"iconfont icon-wenjianjia content-dir content-a"}
                                            >
                                                {item}
                                            </NavLink>
                                        </Tooltip>
                                    )||(//文件下载
                                        <Tooltip title="点击下载按钮下载文件" placement="right" mouseEnterDelay={0.5}>
                                            <a 
                                                className={"iconfont icon-wenjian content-a content-file"}
                                            >
                                                {item}
                                                <Download onClick={
                                                    this.download.bind(
                                                        this,
                                                        "http://localhost:3005/file/get?url="+decodeURIComponent(window.location.hash).replace("#/","/")+"/"+item,
                                                        item
                                                    )
                                                }
                                                />
                                            </a>
                                        </Tooltip>
                                    )
                                }
                                </li>
                            )
                        }
                    )||(<Notfind/>)
                }
            </ul>
        )
    }
}
