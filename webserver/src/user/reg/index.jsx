import React, { Component } from 'react'
import { Drawer, Button ,Input,message} from 'antd';
import "./index.css"
export default class index extends Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
        visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onsubmit=()=>{
        let regpwd=document.getElementById("regpwd");
        let regconfirmpwd=document.getElementById("regconfirmpwd");
        if(regpwd.value.length<=6||regconfirmpwd.value.length<=6){
            message.info("密码长度必须大于6位");
            regpwd.value="";
            regconfirmpwd.value="";
            regpwd.focus();
        }
        else if(regpwd.value!==regconfirmpwd.value){
            message.info("两次输入的密码不一致");
            regpwd.value="";
            regconfirmpwd.value="";
            regpwd.focus();
        }else{
            let count=document.getElementById("count");
            if(isNaN(Number(count.value))){
                message.info("账号只能输入数字");
                regpwd.value="";
                regconfirmpwd.value="";
                count.value="";
                count.focus();
                return;
            }
            if(Number(count.value)<=100){
                message.info("账号的数字需要大于100");
                regpwd.value="";
                regconfirmpwd.value="";
                count.value="";
                count.focus();
                return;
            }
            fetch(
                `http://localhost:3005/user/reg`,
                {
                    method:"post",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify({userid:count.value,password:regconfirmpwd.value})
                }
            ).then(
                Response=>Response.json()
            ).then(
                data=>{
                    if(data.userid){
                        message.info("注册成功");
                        regpwd.value="";
                        regconfirmpwd.value="";
                        count.value="";
                        window.location.href="/";
                    }else{
                        message.info("用户已存在");
                        regpwd.value="";
                        regconfirmpwd.value="";
                        count.value="";
                        count.focus();
                    }
                }
            ); 
        }
    }
    render() {
        return (
            <div>
                <Button type="ghost" ghost id={"reg"} onClick={this.showDrawer}>
                注册
                </Button>
                    <Drawer
                        placement="bottom"
                        closable={true}
                        height={"100%"}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        destroyOnClose="true"
                        bodyStyle={{
                            backgroundImage:`url(${require("../usercenter/bgimages/passwordbackground.jpeg")})`,
                            height:"100vh",
                            backgroundRepeat:"no-repeat",
                            backgroundSize:"100% 100%"
                        }}
                    >
                        <div className={"reg"}>
                            <div style={{textAlign:"center",fontSize:32}}>注册</div>
                            <div>
                                <div className={"pwdtitle"}>请输入您希望的账号:</div>
                                <Input placeholder="请输入您希望的账号(仅100以上数字)" id={"count"}/>
                            </div>
                            <div>
                                <div className={"pwdtitle"}>请输入密码:</div>
                                <Input.Password placeholder="请输入密码" id={"regpwd"} visibilityToggle={false}/>
                            </div>
                            <div>
                                <div className={"pwdtitle"}>请输入再次输入密码:</div>
                                <Input.Password placeholder="请输入再次输入密码" id={"regconfirmpwd"} visibilityToggle={false} onPressEnter={this.onsubmit}/>
                            </div>
                            <div>
                                <Button type="primary" onClick={this.onsubmit}>提交</Button>
                            </div>
                        </div>
                    </Drawer>
            </div>
        )
    }
}
