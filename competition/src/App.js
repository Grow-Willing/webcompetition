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
                    background: "url(http://localhost:3005/usericon/"+atob(sessionStorage.getItem("userid"))+"/background.jpg),linear-gradient( 100deg,rgb(55, 74, 171) 0%,rgb(52, 119, 158) 20%,rgb(57, 187, 218) 30%,rgb(27, 67, 140) 40%,rgb(16, 127, 138) 50%,rgb(234, 185, 42) 80%,rgb(218, 131, 40) 100% )",
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
