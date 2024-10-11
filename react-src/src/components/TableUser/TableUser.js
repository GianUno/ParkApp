import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalSpot from '../ModalUser/ModalSpot';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

class TableSpot extends Component {

  render() {

    let spots = this.props.spots;

    spots = spots.map((spot) => 
      <Table.Row key={spot._id}>
        <Table.Cell>{spot.name}</Table.Cell>
        <Table.Cell>{spot.plate}</Table.Cell>
        <Table.Cell>{spot.model}</Table.Cell>
        <Table.Cell>{spot.color}</Table.Cell>
        <Table.Cell>
          <ModalSpot
            headerTitle='Editar Vaga'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Salvar'
            buttonColor='blue'
            spotID={spot._id}
            onSpotUpdated={this.props.onSpotUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
          <ModalConfirmDelete
            headerTitle='Deletar Vaga'
            buttonTriggerTitle='Delete'
            buttonColor='black'
            spot={spot}
            onSpotDeleted={this.props.onSpotDeleted}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Table.Cell>
      </Table.Row>
    );


    spots = [...spots].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Placa</Table.HeaderCell>
            <Table.HeaderCell>Modelo</Table.HeaderCell>
            <Table.HeaderCell>Cor</Table.HeaderCell>
            <Table.HeaderCell>Valor/h</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {spots}
        </Table.Body>
      </Table>
    );
  }
}


export default TableSpot;

