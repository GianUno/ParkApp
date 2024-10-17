import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'semantic-ui-react';

class FinishedSpots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finishedSpots: []
    };
  }

  componentDidMount() {
    this.fetchFinishedSpots();
  }

  fetchFinishedSpots() {
    axios.get(`${this.props.server}/api/spots/finished`)
      .then((response) => {
        this.setState({ finishedSpots: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { finishedSpots } = this.state;

    return (
      <div>
        <h2>Vagas Finalizadas</h2>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Placa</Table.HeaderCell>
              <Table.HeaderCell>Custo Final</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {finishedSpots.map((spot) => (
              <Table.Row key={spot._id}>
                <Table.Cell>{spot.name}</Table.Cell>
                <Table.Cell>{spot.plate}</Table.Cell>
                <Table.Cell>R$ {spot.finalCost}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default FinishedSpots;
