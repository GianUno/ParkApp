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
      </Table.Row>
    )
  }
}