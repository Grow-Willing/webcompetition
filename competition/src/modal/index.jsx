import React from 'react'
import { Modal} from 'antd';

export default class App extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
        <Modal
            title={this.props.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
  }
}