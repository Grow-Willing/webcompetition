import React, { Component } from 'react'
export default class index extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
      if(nextProps==this.props){
          return false;
      }else{
          return true;
      }
    }
    
  render() {
    return (
        <div className="bgshower" onClick={this.props.onClick}style={{
            backgroundImage: this.props.src,
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
        }}></div>
    )
  }
}