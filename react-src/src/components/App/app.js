import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableSpot from '../TableUser/TableUser';
import ModalSpot from '../ModalUser/ModalSpot';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';
    this.socket = io(this.server);

    this.state = {
      users: [],
      online: 0
    }

    this.fetchSpots = this.fetchSpots.bind(this);
    this.handleSpotAdded = this.handleSpotAdded.bind(this);
    this.handleSpotUpdated = this.handleSpotUpdated.bind(this);
    this.handleSpotDeleted = this.handleSpotDeleted.bind(this);
  }

  componentDidMount() {
    this.fetchSpots();
    this.socket.on('User entra', data => this.setState({ online: data }));
    this.socket.on('User sai', data => this.setState({ online: data }));
    this.socket.on('Add', data => this.handleSpotAdded(data));
    this.socket.on('Update', data => this.handleSpotUpdated(data));
    this.socket.on('Delete', data => this.handleSpotDeleted(data));
  }

  fetchSpots() {
    axios.get(`${this.server}/api/spots/`)
    .then((response) => {
      this.setState({ spots: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
  }


  handleSpotAdded(spot) {
    let spots = this.state.spots.slice();
    spots.push(spot);
    this.setState({ spots: spots });
  }

  handleSpotUpdated(spot) {
    let spots = this.state.spots.slice();

    let i = spots.findIndex(s => s._id === user._id)

    if (spots.length > i) { spots[i] = spot }

    this.setState({ spots: spots });
  }

  handleSpotDeleted(spot) {
    let spots = this.state.spots.slice();
    spots = spots.filter(s => { return s._id !== spot._id; });
    this.setState({ spots: spots });
  }

  render() {
    let peopleOnline = this.state.online - 1;
    let onlineText = "";

    if (peopleOnline < 1) {
      onlineText = 'Ninguém online.';
    } else {
      onlineText = peopleOnline > 1 ? `${this.state.online - 1} pessoas online` : `${this.state.online - 1} pessoa online.`;
    }

    return (
      <div>
        <div className='App'>
          <div className='App-header'>
          <h1 className='App-intro'>PARK</h1>
          <p>
            yesyes
            <br/>
            parkpark
          </p>
         </div>
        </div>
        <Container>
        <ModalSpot
          headerTitle='Add spot'
          buttonTriggerTitle='Adicionar Vaga'
          buttonSubmitTitle='Add'
          buttonColor='green'
          onSpotAdded={this.handlespotAdded}
          server={this.server}
          socket={this.socket}
        />
      </Container>
      </div>
    );
  }
}

export default App;