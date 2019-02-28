import React from 'react'
import { Button } from 'antd';

export default class ButtonSize extends React.Component {
  state = {
    size: 'small',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const size = this.state.size;
    return (
        <Button
            type="primary"
            shape="circle"
            icon="download"
            size={size}
            onClick={this.props.onClick&&this.props.onClick}
            style={{position:"absolute",top:3,right:"3%",boxShadow: "4px 4px 5px lightgray"}}
        />
      );
  }
}