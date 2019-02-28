import React, { Component } from 'react'
import './index.css'
export default class index extends Component {
    // componentDidMount = () => {
    //     let oimg=document.getElementsByTagName("img"),
    //     len=oimg.length;
    //     for(let i=0;i<len;i++){
    //         oimg[i].num=0;
    //     }
    //     for(let i=0;i<len;i++){
    //         oimg[i].onclick=function(){
    //             if(oimg[i].num==0){
    //                 oimg[i].num=1;
    //                 oimg[i].style.transform="scale(1.27)";
    //                 oimg[i].title="再次点击还原图片";
    //                 oimg[i].style.zIndex="1";
    //             }else{
    //                 oimg[i].num=0;
    //                 oimg[i].style.transform="scale(1)";
    //                 oimg[i].title="点击放大图片";
    //                 oimg[i].style.zIndex="";
    //             }
    //         }
    //     }
    // }
    
  render() {
    return (
        <div className="respond">
            <dl>
                <dt>
                    <em>1、</em>
                    <span>帐号相关问题</span>
                </dt>
                <dd>
                    <div className="t">1、帐号的注册</div>
                    <div>(1)首先，点击注册按钮，跳转到注册页面</div>
                    <a href={require("./static/注册1.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/注册1.png")} alt=""/>
                    </a>
                    <div>(2)然后，按照帐号密码要求格式输入帐号密码，点击提交按钮，进行帐号密码帐号的验证，并返回注册状态。若帐号已存在，则会返回帐号已存在，重新进行帐号注册。若注册成果则会自动返回首页</div>
                    <a href={require("./static/注册2.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/注册2.png")} alt=""/>
                    </a>
                    <div className="t">2、帐号的登录</div>
                    <div>(1)首先，点击登录按钮，跳转到登录页面</div>
                    <a href={require("./static/登陆1.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/登陆1.png")} alt=""/>
                    </a>
                    <div>(2)然后，输入帐号密码，点击提交按钮，进行帐号密码帐号的验证，并返回登录状态。若帐号不正确，返回帐号不合法。若密码不正确，返回密码不合法。当帐号密码验证成功时，返回登录成果状态并跳转首页</div>
                    <a href={require("./static/登陆2.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/登陆2.png")} alt=""/>
                    </a>
                </dd>
            </dl>
            <dl>
                <dt>
                    <em>2、</em>
                    <span>用户个性化设置</span>
                </dt>
                <dd>
                    <div className="t">1、用户头像更改</div>
                    <div>(1)首先，点击个人中心按钮，跳转到个性化页面</div>
                    <a href={require("./static/用户头像1.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/用户头像1.png")} alt=""/>
                    </a>
                    <div>(2)点击个性化按钮，弹出用户头像和背景设置</div>
                    <a href={require("./static/用户头像2.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/用户头像2.png")} alt=""/>
                    </a>
                    <div>(3)点击用户头像，弹出用户头像设置对话框</div>
                    <a href={require("./static/用户头像3.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/用户头像3.png")} alt=""/>
                    </a>
                    <div>(4)弹出上传头像的对话框</div>
                    <a href={require("./static/用户头像4.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/用户头像4.png")} alt=""/>
                    </a>
                    <div>(5)选择好图片后，点击上传按钮</div>
                    <a href={require("./static/用户头像5.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/用户头像5.png")} alt=""/>
                    </a>
                    <div>(6)上传成功</div>
                    <a href={require("./static/用户头像6.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/用户头像6.png")} alt=""/>
                    </a>
                    <div className="t">2、用户界面背景设置</div>
                    <div>(1)首先，点击个人中心按钮，跳转到个性化页面</div>
                    <a href={require("./static/界面背景1.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/界面背景1.png")} alt=""/>
                    </a>
                    <div>(2)点击个性化按钮，弹出用户头像和背景设置</div>
                    <a href={require("./static/界面背景2.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/界面背景2.png")} alt=""/>
                    </a>
                    <div>(3)点击背景设置，弹出背景设置对话框</div>
                    <a href={require("./static/界面背景3.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/界面背景3.png")} alt=""/>
                    </a>
                    <div>(4)弹出上传背景图片的对话框</div>
                    <a href={require("./static/界面背景4.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/界面背景4.png")} alt=""/>
                    </a>
                    <div>(5)选择好图片后，点击上传按钮</div>
                    <a href={require("./static/界面背景5.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/界面背景5.png")} alt=""/>
                    </a>
                    <div>(6)上传成功</div>
                    <a href={require("./static/界面背景6.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/界面背景6.png")} alt=""/>
                    </a>
                </dd>
            </dl>
            <dl>
                <dt>
                    <em>3、</em>
                    <span>文件的上传与下载</span>
                </dt>
                <dd>
                    <div className="t">1、文件上传</div>
                    <div>(1)上传失败的情况</div>
                    <div>(Ⅰ)上传文件需要登录帐号。不登陆即使文件上传地址正确也无法上传</div>
                    <a href={require("./static/上传失败1.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/上传失败1.png")} alt=""/>
                    </a>
                    <div>(Ⅱ)当登录以后，如果文件上传地址不正确，也无法上传文件</div>
                    <a href={require("./static/上传失败2.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/上传失败2.png")} alt=""/>
                    </a>
                    <div>(2)正确的上传方法</div>
                    <div>(Ⅰ)首先，需要选择文件上传的地址，例如选择文科资料下载处。然后，点击学习资料上传，弹出文件上传对话框，选择要上传的文件</div>
                    <a href={require("./static/上传成功1.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/上传成功1.png")} alt=""/>
                    </a>
                    <div>(Ⅱ)当选择好上传的文件的时候，点击打开即可上传文件</div>
                    <a href={require("./static/上传成功2.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/上传成功2.png")} alt=""/>
                    </a>
                    <div>(Ⅲ)上传成功</div>
                    <a href={require("./static/上传成功3.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/上传成功3.png")} alt=""/>
                    </a>
                    <div className="t">2、文件下载</div>
                    <div>(1)首先，选择到想要下载文件对应的文件夹并点击下载文件的下载按钮，弹出下载文件保存地址的对话框进行保存地址的选择</div>
                    <a href={require("./static/下载成功1.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/下载成功1.png")} alt=""/>
                    </a>
                    <div>(2)当选择好保存地址后，点击保存按钮即可完成下载</div>
                    <a href={require("./static/下载成功2.png")} target="_blank">
                        <img title="点击放大图片" src={require("./static/下载成功2.png")} alt=""/>
                    </a>
                </dd>
            </dl>
        </div>
    )
  }
}
