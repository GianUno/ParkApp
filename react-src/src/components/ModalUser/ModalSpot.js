import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormSpot from '../FormSpot/FormSpot';

class ModalSpot extends Component {

  render() {
    return (
      <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormSpot
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            spotID={this.props.spotID}
            onSpotAdded={this.props.onSpotAdded}
            onSpotUpdated={this.props.onSpotUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalSpot;