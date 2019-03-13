import React from 'react'
import { message,Drawer, Button,Input,AutoComplete  } from 'antd';
import Icon from './icon/index'
import Bg from'./bg/index'
import "./index.css";
const { TextArea } = Input;
const Option = AutoComplete.Option;
let defaultsrc;
let defaultbg;
if(sessionStorage.getItem("userid")){
    defaultsrc=`http://localhost:3005/usericon/${atob(sessionStorage.getItem("userid"))}/icon.jpg`;
    defaultbg="url(http://localhost:3005/usericon/"+atob(sessionStorage.getItem("userid"))+"/background.jpg),linear-gradient( 100deg,rgb(55, 74, 171) 0%,rgb(52, 119, 158) 20%,rgb(57, 187, 218) 30%,rgb(27, 67, 140) 40%,rgb(16, 127, 138) 50%,rgb(234, 185, 42) 80%,rgb(218, 131, 40) 100% )"
}
export default class App extends React.Component {
	state = {
        visible:false,
        firstchildrenDrawer:false,
        secondchildrenDrawer:false,
        thirdchildrenDrawer:false,
        src:defaultsrc,
        background:defaultbg,
        result: [],
    };
    icon={};
    //主抽屉
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
    //个性化
	showfirstChildrenDrawer = () => {
		this.setState({
			firstchildrenDrawer: true,
		});
	};
	onfirstChildrenDrawerClose = () => {
		this.setState({
			firstchildrenDrawer: false,
		});
    };
    
    reseticon=()=>{
        this.setState({src:defaultsrc});
        this.refs.changeicon.value="";
    }
    changeicon=()=>{
        let setState=this.setState.bind(this);
        let that=this;
        let x=this.refs.changeicon;
        x.click();
        x.onchange=function(){
            if(this.files.length){
                that.icon=this.files.item(0);
                if(/image/.test(that.icon.type)){
                    let read=new FileReader();
                    read.readAsDataURL(that.icon);
                    read.onload=function(){
                        let src=read.result;
                        setState({
                            src
                        })
                    }
                }
                else{
                    message.warn("请不要选择非图片类型的文件");
                }
            }
        }
    }
    submiticon=()=>{
        if(this.state.src==defaultsrc) {
            message.warn("请不要上传没有更改的数据");
            return;
        }
        let data=new FormData();
        data.append("userid",atob(sessionStorage.getItem("userid")));
        data.append("file",this.icon);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status==200){
                message.success(xhr.responseText);
            }
        };
        xhr.open('POST','http://localhost:3005/iconlist');
        xhr.send(data)
    }
    //设置背景
    changebg=()=>{
        let bg=document.getElementById("changebg");
        let setState=this.setState.bind(this);
        let that=this;
        bg.click();
        bg.onchange=function(){
            if(this.files.length){
                that.background=this.files.item(0);
                if(/image/.test(that.background.type)){
                    let read=new FileReader();
                    read.readAsDataURL(that.background);
                    read.onload=function(){
                        let background=read.result;
                        let box=document.getElementById("background");
                        box.style.background=`url(${background}) no-repeat center/cover`;
                        setState({
                            background
                        })
                    }
                }
                else{
                    message.warn("请不要选择非图片类型的文件");
                }
            }
        }
    }
    submitbg=()=>{
        if(this.state.background=="") {
            message.warn("请不要上传没有更改的数据");
            return;
        }
        let data=new FormData();
        data.append("userid",atob(sessionStorage.getItem("userid")));
        data.append("file",this.background);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status==200){
                message.success(xhr.responseText);
            }
        };
        xhr.open('POST','http://localhost:3005/backgroundlist');
        xhr.send(data)
    }
    resetbg=()=>{
        let userid=atob(sessionStorage.getItem("userid"));
        let x=document.getElementsByClassName("bgshower")[0].style;
        x.backgroundImage=defaultbg;
        x.backgroundRepeat="no-repeat";
        x.backgroundPosition="center";
        x.backgroundSize="cover";
        x=document.getElementById("background").style;
        x.backgroundImage=defaultbg;
        x.backgroundRepeat="no-repeat";
        x.backgroundPosition="center";
        x.backgroundSize="cover";
        x=document.getElementById("changebg");
        x.value="";
    }


    //修改密码
    showsecondChildrenDrawer = () => {
		this.setState({
			secondchildrenDrawer: true,
		});
	};
	onsecondChildrenDrawerClose = () => {
		this.setState({
			secondchildrenDrawer: false,
		});
    };
    reset=()=>{
        let newpassword=document.getElementById("newpwd");
        let oldpwd=document.getElementById("oldpwd");
        let confirmpassword=document.getElementById("confirmpwd");
        oldpwd.value="";
        confirmpassword.value="";
        newpassword.value="";
    }
    changepwd=()=>{
        let userid=sessionStorage.getItem("userid");
        if(Number(userid)<=0){
            message.info("对不起，登陆信息丢失，请重新登陆",1,()=>{window.location.href="/"});
            return;
        }
        let newpassword=document.getElementById("newpwd");
        let newpwd=newpassword.value;
        let confirmpassword=document.getElementById("confirmpwd");
        let confirmpwd=confirmpassword.value;
        let oldpwd=document.getElementById("oldpwd");
        if(oldpwd.value.length<=6){
            message.info('您确定密码对吗?',1,null);
            oldpwd.value="";
            oldpwd.focus();
            return;
        }else if(newpwd.length<=6||confirmpwd.length<=6){
            message.info('密码长度必须大于6位',1,null);
            confirmpassword.value="";
            newpassword.value="";
            newpassword.focus();
            return;
        }else if(newpwd!==confirmpwd){
            message.info('两次密码不一致',1,null);
            confirmpassword.value="";
            newpassword.value="";
            newpassword.focus();
            return;
        }else{
            //数据库存取
            
            fetch(
                `http://localhost:3005/user/change`,
                {
                    method:"post",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify({userid:atob(userid),password:oldpwd.value,newpwd})
                }
            ).then(
                Response=>Response.json()
            ).then(
                data=>{
                    if(data.userid){
                        message.success('修改密码成功');
                    }else{
                        message.error('对不起，请您核对密码后再更改');
                    }
                    confirmpassword.value="";
                    newpassword.value="";
                    oldpwd.value="";
                }
            ); 
        }
    }

    //意见反馈
    showthirdChildrenDrawer = () => {
		this.setState({
			thirdchildrenDrawer: true,
		});
	};
	onthirdChildrenDrawerClose = () => {
		this.setState({
			thirdchildrenDrawer: false,
		});
    };
    handleSearch = (value) => {
    let result;
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ result });
    }
    submitfeedback=()=>{
        let text=document.getElementById("feedbacktext");
        let tel=document.getElementById("feedbacktel");
        let email=document.getElementById("feedbackemail");
        if(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(email.value)){
            if(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(tel.value)){
                if(text.value.replace(/\s+/g,"")==""){
                    message.info("请输入您的意见,不要留空哦^o^//");
                    text.focus();
                    return;
                }
            }else{
                message.error("手机号不合法");
                tel.value="";
                tel.focus();
                return;
            }
        }else{
            message.error("邮箱不合法");
            email.value="";
            email.focus();
            return;
        }
        message.success("提交成功");
    }
	render() {
        const { result } = this.state;
        const children = result.map(email => <Option key={email}>{email}</Option>);
		return (
			<div style={{display:"flex"}}>
			<Icon src={this.state.src} onClick={this.showDrawer} height={"32px"} width={"32px"}/>
			<Button type="primary" ghost onClick={this.showDrawer}>
				个人中心
			</Button>
			<Drawer
				title="个人中心"
				placement="left"
				closable={false}
				onClose={this.onClose}
				visible={this.state.visible}
				className={"usersetting"}
			>
				<p className="personalitemstitle" onClick={this.showfirstChildrenDrawer}>个性化</p>
                    
                <p className="personalitemstitle" onClick={this.showsecondChildrenDrawer}>修改密码</p>

                <p className="personalitemstitle" onClick={this.showthirdChildrenDrawer}>意见反馈</p>

                    <Drawer
                        title="个性化"
                        placement="left"
                        width={"370px"}
                        closable={false}
                        onClose={this.onfirstChildrenDrawerClose}
                        visible={this.state.firstchildrenDrawer}
                    >
                        <div className={"personalitems"}>
                            <div>设置头像</div>
                            <Icon onClick={this.changeicon} src={this.state.src}  height={"70px"} width={"70px"}/>
                            <Button type="dashed" size="small" className="reset" onClick={this.reseticon}>重置</Button>
                            <Button size="small" className="submiticon" onClick={this.submiticon}>上传</Button>
                            <input type="file" name="changeicon" ref="changeicon" style={{display:"none"}}/>
                        </div>
                        <div className={"personalitems"}>
                            <div>设置背景</div>
                            <Bg onClick={this.changebg} src={this.state.background}/>
                            <Button type="dashed" size="small" className="reset" onClick={this.resetbg}>重置</Button>
                            <Button size="small" className="submiticon" onClick={this.submitbg}>上传</Button>
                            <input type="file" name="changebg" id="changebg" style={{display:"none"}}/>
                        </div>
                    </Drawer>


                    <Drawer
                        title="修改密码"
                        placement="left"
                        width={"1300px"}
                        closable={true}
                        onClose={this.onsecondChildrenDrawerClose}
                        visible={this.state.secondchildrenDrawer}
                    >
                        <div className={"changepassword"}>
                            <div>
                                <div className={"pwdtitle"}>请输入初始密码:</div>
                                <Input.Password placeholder="请输入初始密码" id={"oldpwd"}/>
                            </div>
                            <div>
                                <div className={"pwdtitle"}>请输入新密码:</div>
                                <Input.Password placeholder="请输入新密码" id={"newpwd"} visibilityToggle={"false"}/>
                            </div>
                            <div>
                                <div className={"pwdtitle"}>确认新密码:</div>
                                <Input.Password placeholder="确认新密码" visibilityToggle={"false"} id={"confirmpwd"} onPressEnter={this.changepwd}/>
                            </div>
                            <div style={{justifyContent:"flex-end"}}>
                                <Button type="primary" onClick={this.reset}>
                                    全部清空
                                </Button>
                                <Button type="primary" onClick={this.changepwd}>
                                    提交密码
                                </Button>
                            </div>
                        </div>
                    </Drawer>

                    <Drawer
                        title="意见反馈"
                        placement="left"
                        width={"100vw"}
                        minWidth={"400px"}
                        closable={true}
                        onClose={this.onthirdChildrenDrawerClose}
                        visible={this.state.thirdchildrenDrawer}
                    >
                        <div className={"feedback"}>
                            <div className="feedbackmsg">
                                <div>
                                    <i className="iconfont icon-bangdingyouxiang"/>
                                    <AutoComplete
                                        dataSource={children}
                                        style={{ width: "100%" }}
                                        onSearch={this.handleSearch}
                                    >
                                        <Input id="feedbackemail" placeholder="请输入邮箱" />
                                    </AutoComplete>
                                </div>
                                <div>
                                    <i className="iconfont icon-dianhua"/>
                                    <Input id="feedbacktel" placeholder="请输入联系电话" />
                                </div>
                                <div id="feedbacktextbox">
                                    <TextArea id="feedbacktext" placeholder="请输入您的宝贵意见" autosize={{ minRows: 2, maxRows: 6 }} />
                                </div>
                            </div>
                            <Button id="submitfeedback" type="primary" onClick={this.submitfeedback}>提交</Button>
                        </div>
                    </Drawer>
				</Drawer>
			</div>
		);
	}
}