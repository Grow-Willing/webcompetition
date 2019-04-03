import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {HashRouter as Router} from 'react-router-dom'
import Title from './title/index'
import Nav from './nav/index'
import Content from './content/index'
import User from './user/index'
import History from './history/index'
import {createStore} from 'redux'

import './App.css'

// let store=createStore(reducer);

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Title></Title>
                <div className={"content"}>
                    <Nav></Nav>
                    <Content></Content>
                    <div className="personal">
                        <User></User>
                        {/* <hr/> */}
                        <History></History>
                    </div>
                </div>
                <div id="background" style={{
                    filter: "blur(2px)",
                    background: "url(http://localhost:3005/usericon/"+atob(sessionStorage.getItem("userid"))+"/background.jpg),url(http://localhost:3005/needs/defaultbackground.jpg)",
                    backgroundRepeat:"no-repeat",
                    backgroundPosition:"center",
                    backgroundSize:"cover",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    minWidth: "1300px",
                    minHeight: "475px",
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}></div>
            </div>
        </Router>
    );
  }
}

export default App;
