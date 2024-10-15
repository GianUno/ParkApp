import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

class ModalCheckout extends Component {

  constructor(props){
    super(props);
  

  this.state = {
    modalOpen: false
  }

  this.handleOpen = this.handleOpen.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = e => this.setState({ modalOpen: true });
  handleClose = e => this.setState({ modalOpen: false });

  handleSubmit(e) {
    console.log('entrei');
    const spotID = this.props.spot._id;

    axios({
      method: 'put',
      responseType: 'json',
      url: `${this.props.server}/api/spots/checkout/${spotID}`
    })
    .then((response) => {
      this.handleClose();
      this.props.onSpotUpdated(response.data.result);
      this.props.socket.emit('update', response.data.result);
      console.log('Passei pelo updt');
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log('1 if de err');
        if (err.response.data) {
          console.log('2 if de err');
          this.setState({
            formClassName: 'warning',
            formErrorMessage: err.response.data.msg
          });
        }
      }
      else {
        console.log('deu else');
        this.setState({
          formClassName: 'warning',
          formErrorMessage: 'Something went wrong. ' + err
        });
      }
    });
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        dimmer='inverted'
        size='tiny'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <p>Deseja finalizar a vaga <strong>{this.props.spot.name}</strong></p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit} data-spotID={this.props.spot._id} color='green'>Sim</Button>
          <Button onClick={this.handleClose} color='black'>Não</Button>
        </Modal.Actions>
      </Modal>
    )};
  
}
export default ModalCheckout;
