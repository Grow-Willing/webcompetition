import React, { Component } from 'react'
import {Button,Modal,message} from 'antd';
import './index.css'
export default class index extends Component {
    click=()=>{
        let input=document.getElementById("upload");
        input.click();
        input.onchange=function(){
            if(input.value){
                let file=this.files.item(0);
                let path=decodeURIComponent(window.location.hash.replace("#/","/"));
                let data=new FormData();
                data.append("path",path);
                data.append("file",file);
                data.append("userid",atob(sessionStorage.getItem("userid")));
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4 && xhr.status==200){
                        message.info(xhr.responseText);
                    }
                };
                xhr.open('POST','http://localhost:3005/file/upload');
                xhr.send(data)
            }
        }
    }
  render() {
    return (
        <div className="uploadbox" style={{display:"none"}}>
            <Button type="default" id="uploadbutton" onClick={this.click}>上传文件</Button>
            <input type="file" id="upload" style={{display:"none"}}/>
        </div>
    )
  }
}