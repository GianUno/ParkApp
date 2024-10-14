import React, { Component } from 'react';
import { Message, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

class FormSpot extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      plate: '',
      model: '',
      color: '',
      cost: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.spotID) {
      axios.get(`${this.props.server}/api/spots/${this.props.spotID}`)
      .then((response) => {
        this.setState({
        name: response.data.name,
        plate: response.data.plate,
        model: response.data.model,
        color: response.data.color,
        cost: response.data.cost
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    /*if (name === 'cost') {
      value = value.replace(/[^\d.]/g, '');
    }*/

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();


    if (!this.state.name || !this.state.plate || !this.state.model || !this.state.color || !this.state.cost) {
      this.setState({
        formClassName: 'warning',
        formErrorMessage: 'Porfavor preencha todos os campos.'
      });
      return;
    }


    const spot = {
      name: this.state.name,
      plate: this.state.plate,
      model: this.state.model,
      color: this.state.color,
      cost: this.state.cost
    }

    const method = this.props.spotID ? 'put' : 'post';
    const params = this.props.spotID ? this.props.spotID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/spots/${params}`,
      data: spot
    })
    .then((response) => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });

      if (!this.props.spotID) {
        this.setState({
          name: '',
          plate: '',
          model: '',
          color: '',
          cost: ''
        });
        this.props.onSpotAdded(response.data.result);
        this.props.socket.emit('add', response.data.result);
      }
      else {
        this.props.onSpotUpdated(response.data.result);
        this.props.socket.emit('update', response.data.result);
      }

    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: err.response.data.msg
          });
        }
      }
      else {
        this.setState({
          formClassName: 'warning',
          formErrorMessage: 'Something went wrong. ' + err
        });
      }
    });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          label = 'Nome'
          type = 'text'
          placeholder = 'Nome Cliente'
          name = 'name'
          maxLength = '40'
          required
          value = {this.state.name}
          onChange = {this.handleInputChange}
        />
        <Form.Input
          label = 'Placa'
          type = 'text'
          placeholder = 'ABC1D23'
          name = 'plate'
          maxLength = '7'
          required
          value = {this.state.plate}
          onChange = {this.handleInputChange}
        />
        <Form.Input
          label = 'Modelo'
          type = 'text'
          placeholder = 'Corsa'
          name = 'model'
          maxLength = '15'
          required
          value = {this.state.model}
          onChange = {this.handleInputChange}
        />
        <Form.Input
          label = 'Cor'
          type = 'text'
          placeholder = 'Cinza'
          name = 'color'
          maxLength = '20'
          required
          value = {this.state.color}
          onChange = {this.handleInputChange}
        />
        <Form.Input
          label = 'Custo'
          type = 'numeric'
          placeholder = '10.00'
          name = 'cost'
          required
          value = {this.state.cost}
          onChange = {this.handleInputChange}
        />
        <Message
          success
          color='green'
          header='Nice!'
          content={formSuccessMessage}
        />
        <Message
          warning
          color = 'yellow'
          header = 'Algo deu errado!'
          content = {formErrorMessage}
        />
        <Button color = {this.props.buttonColor} floated = 'right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br />
      </Form>
    );
  }
}


export default FormSpot;