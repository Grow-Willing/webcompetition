import React, { Component } from 'react'
import { Button,message } from 'antd'
export default class index extends Component {
    click=()=>{
        sessionStorage.removeItem("userid");
        message.success("退出成功，三秒后将刷新页面");
        setTimeout(()=>{window.location.reload()},3000);
    }
    render() {
        return (
            <Button type="primary" ghost onClick={this.click}>退出登陆</Button>
        )
    }
}
