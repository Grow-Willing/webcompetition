import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Index from './index/index'
import File from './file/index'
import Welcome from './welcome/index'
import Upload from './upload/index'
import Help from './help/index'
import Mkdir from "./mkdir/index"
import "./index.css"
export default class index extends Component {
    render() {
        return (
            <div className="conBody">
                <Route path="/" exact component={Welcome}></Route>
                <Route path="/全部文件" component={Index}/>
                <Route path="/全部文件" component={File}/>
                {sessionStorage.getItem("userid")&&<Route path="/全部文件" component={Upload}/>}
                {sessionStorage.getItem("userid")&&<Route path="/全部文件" component={Mkdir}/>}
                <Route path="/help" component={Help}/>
            </div>
        )
    }
}
