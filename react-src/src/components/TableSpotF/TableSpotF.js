import React, { Component } from 'react';
import { Message, Table, Container, Button } from 'semantic-ui-react';
import axios from 'axios';


import ConfirmDeleteCheckout from '../ConfirmDeleteCheckout/ConfirmDeleteCheckout';
import ModalQRCode from '../ModalQRCode/ModalQRCode';
class FinishedSpots extends Component {
  constructor(props) {
    super(props);

    this.props.server = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    this.state = {
      finishedSpots: [], // Array inicial
      formErrorMessage: ''
    };

    this.fetchFinishedSpots = this.fetchFinishedSpots.bind(this);
  }

  componentDidMount() {
    this.fetchFinishedSpots();
  }

  fetchFinishedSpots() {
    axios.get(`${this.props.server}/api/spots/finished`)
      .then((response) => {
        const spots = Array.isArray(response.data) ? response.data : [];
        this.setState({ finishedSpots: spots });
      })
      .catch((err) => {
        this.setState({ formErrorMessage: 'Erro ao buscar vagas finalizadas. ' + err });
      });
  }

  handleSpotDeleted(spot) {
    let finishedSpots = this.state.finishedSpots.slice();  // Copiando o array finishedSpots
    finishedSpots = finishedSpots.filter(s => s._id !== spot._id);  // Filtrando para remover a vaga
    this.setState({ finishedSpots: finishedSpots });  // Atualizando o estado com o novo array
  }
  

  render() {
    let { finishedSpots, formErrorMessage } = this.state;


    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <h1 className='App-intro'>PARK</h1>
          </div>
        </div>
        <Container>
        <h2>Vagas Finalizadas</h2>
        <Button href='/home' color='green'>Acessar Vagas Registradas</Button>
        {formErrorMessage && (
          <Message
            warning
            color='yellow'
            header='Algo deu errado!'
            content={formErrorMessage}
          />
        )}
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Placa</Table.HeaderCell>
              <Table.HeaderCell>Custo Final</Table.HeaderCell>
              <Table.HeaderCell>Data de Finalização</Table.HeaderCell>
              <Table.HeaderCell>Duração</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {finishedSpots.map((spot) => (
              <Table.Row key={spot._id}>
                <Table.Cell>{spot.name}</Table.Cell>
                <Table.Cell>{spot.plate}</Table.Cell>
                <Table.Cell>R$ {spot.finalCost}</Table.Cell>
                <Table.Cell>{new Date(spot.endTime).toLocaleString()}</Table.Cell>
                <Table.Cell>{spot.durationTime}</Table.Cell>
                <Table.Cell>
                  <ModalQRCode spot={spot} />
                  <ConfirmDeleteCheckout
                    headerTitle='Deletar Vaga'
                    buttonTriggerTitle='Deletar'
                    buttonColor='black'
                    spot={spot}
                    onSpotDeleted={this.handleSpotDeleted}
                    server={this.props.server}
                  />
                  </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        </Container>
      </div>
    );
  }
}

export default FinishedSpots;
