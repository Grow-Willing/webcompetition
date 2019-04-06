import React, { Component } from 'react'
import {Button,Modal,message,Input} from 'antd';
import './index.css'
export default class index extends Component {
    state = {
        visible: false,
        disabled:false,
    }

    showModal = () => {
        this.setState({
                visible: true,
        });
    }

    handleOk = (e) => {
        this.submit();
        this.setState({
                visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
                visible: false,
        });
    }
    submit=()=>{
        let dirname=document.getElementById("dirname").value;
        fetch(`http://localhost:3005/file/mkdir?path=${decodeURIComponent(window.location.hash.replace("#/","/"))}&&name=${dirname}`).then(
            Response=>Response.text()
        ).then(
            data=>{
                if(data=="ok"){
                    message.success("成功创建",.5,()=>{
                        window.location.hash+="/"+dirname;
                    })
                }
                else message.error(data);
            }
        )
    }
  render() {
    return (
        <div className="mkdirbox">
            <Button type="primary" id="mkdirbutton" onClick={this.showModal}>新建文件夹</Button>
            <Modal
                title="文件夹名"
                okButtonDisabled={this.state.disabled}
                okText="新建"
                cancelText="取消"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                destroyOnClose="true"
            >
                <Input placeholder="请输入文件夹名" id="dirname"/>
            </Modal>
        </div>
    )
  }
}