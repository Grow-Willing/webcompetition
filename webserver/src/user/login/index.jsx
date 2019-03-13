import React from 'react';
import { Drawer, Button ,Input,message} from 'antd';

export default class App extends React.Component {
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
      let id=document.getElementById("userid");
      let userid=id.value;
      let pwd=document.getElementById("pwd");
      let password=pwd.value;
      if(isNaN(Number(userid))||Number(userid)<=0){
        message.info("账号不合法");
        id.value="";
        pwd.value="";
        return;
      }
      if(typeof(password)!="string"||password.length<=6){
        message.info("密码不合法");
        id.value="";
        pwd.value="";
        return;
      }
      fetch(`http://localhost:3005/user/judge?userid=${userid}&&password=${password}`)
      .then(
        res=>res.text()
      ).then(
          data=>{
                if(data==="false"){
                    message.info("用户名或密码错误");
                    id.value="";
                    pwd.value="";
                }else if(data==="true")
                {
                    sessionStorage.setItem("userid",btoa(userid));
                    message.success("登陆成功，即将跳转");
                    setTimeout(()=>{window.location.href="/";},1000)
                }
          }
      )
  }
  render() {
    return (
      <div>
        <Button type="ghost" ghost onClick={this.showDrawer}>
        登陆
        </Button>
            <Drawer
                title="登陆"
                placement="top"
                closable={true}
                height={"100%"}
                onClose={this.onClose}
                visible={this.state.visible}
            >
                <div className={"changepassword"}>
                            <div>
                                <div className={"pwdtitle"}>请输入账号:</div>
                                <Input placeholder="请输入账号" allowClear id={"userid"}/>
                            </div>
                            <div>
                                <div className={"pwdtitle"}>请输入密码:</div>
                                <Input.Password placeholder="请输入密码" id={"pwd"} onPressEnter={this.onsubmit}/>
                            </div>
                            <div>
                                <Button type="primary" onClick={this.onsubmit}>提交</Button>
                            </div>
                        </div>
            </Drawer>
      </div>
    );
  }
}
