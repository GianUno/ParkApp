import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { QRCodeCanvas } from 'qrcode.react';

class ModalQRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { spot } = this.props;

    return (
      <>
        <Button onClick={this.handleOpen} color='green'>
          Gerar QR Code
        </Button>

        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          dimmer='inverted'
          size='small'
        >
          <Modal.Header>QR Code para Pagamento</Modal.Header>
          <Modal.Content>
            <p><strong>Nome:</strong> {spot.name}</p>
            <p><strong>Custo Final:</strong> R$ {spot.finalCost}</p>
            <QRCodeCanvas value={`R$ ${spot.finalCost}`} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose} color='green'>
              Fechar
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default ModalQRCode;
