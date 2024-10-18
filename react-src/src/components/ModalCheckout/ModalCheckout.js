import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

class ModalCheckout extends Component {

  constructor(props){
    super(props);
  
    this.state = {
      modalOpen: false,
      showDetailsModal: false,
      checkoutData: null,  // Para armazenar os dados de finalização
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDetailsModalClose = this.handleDetailsModalClose.bind(this);
  }

  handleOpen = e => this.setState({ modalOpen: true });
  handleClose = e => this.setState({ modalOpen: false });

  handleDetailsModalClose = () => this.setState({ showDetailsModal: false });

  handleSubmit(e) {
    const spotID = this.props.spot._id;

    axios({
      method: 'put',
      responseType: 'json',
      url: `${this.props.server}/api/spots/checkout/${spotID}`
    })
    .then((response) => {
      this.setState({ 
        modalOpen: false,    // Fecha o modal de confirmação
        showDetailsModal: true, // Abre o modal de detalhes
        checkoutData: response.data.result  // Armazena os dados retornados do backend
      });
      this.props.onSpotUpdated(response.data.result);
      this.props.socket.emit('update', response.data.result);
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        formErrorMessage: err.response?.data?.msg || 'Algo deu errado'
      });
    });
  }

  render() {
    const { checkoutData, showDetailsModal } = this.state;

    return (
      <>
        <Modal
          trigger={<Button onClick={this.handleOpen} color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          dimmer='inverted'
          size='tiny'
        >
          <Modal.Header>{this.props.headerTitle}</Modal.Header>
          <Modal.Content>
            <p>Deseja finalizar a vaga <strong>{this.props.spot.name}</strong>?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleSubmit} data-spotID={this.props.spot._id} color='green'>Sim</Button>
            <Button onClick={this.handleClose} color='black'>Não</Button>
          </Modal.Actions>
        </Modal>

        {/* Modal para mostrar os detalhes do checkout */}
        {checkoutData && (
          <Modal
            open={showDetailsModal}
            onClose={this.handleDetailsModalClose}
            dimmer='inverted'
            size='small'
          >
            <Modal.Header>Detalhes da Finalização</Modal.Header>
            <Modal.Content>
              <p><strong>Nome:</strong> {checkoutData.name}</p>
              <p><strong>Placa:</strong> {checkoutData.plate}</p>
              <p><strong>Custo Final:</strong> R$ {checkoutData.finalCost}</p>
              <p><strong>Tempo Total:</strong> {checkoutData.durationInHours} horas</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleDetailsModalClose} color='green'>Fechar</Button>
            </Modal.Actions>
          </Modal>
        )}
      </>
    );
  }
}

export default ModalCheckout;
