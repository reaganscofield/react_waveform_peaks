import React, { Component } from 'react';
import { Button, Modal, ModalBody, FormGroup, FormText, CustomInput} from 'reactstrap';
import './App.css';
import Audio from './components/Audio'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      file: null,
    };
    this.toggle = this.toggle.bind(this);
    this.processFile = this.processFile.bind(this);
  }

  toggle () {
   window.location.replace("/audio");
  }

  processFile = (e) => {
    this.setState({
      file: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
          <ModalBody className="text-center pgAll">
          <FormGroup>
            <CustomInput type="file" onChange={this.processFile} value={this.state.file || ''} />
            <FormText>Upload your file and click on process button.</FormText>
          </FormGroup>
          <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}PROCESS</Button>
          </ModalBody>
          <Audio />
        </Modal>
      </div>
    );
  }
}

export default App;
