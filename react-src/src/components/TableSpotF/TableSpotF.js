import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';

const FinishedSpots = ({ server }) => {
  const [finishedSpots, setFinishedSpots] = useState([]);

  useEffect(() => {
    // Fetch vagas finalizadas
    axios.get(`${server}/api/spots/finished`)
      .then((response) => {
        setFinishedSpots(response.data);
      })
      .catch(err => console.log(err));
  }, [server]);

  return (
    <div>
      <h2>Vagas Finalizadas</h2>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Placa</Table.HeaderCell>
            <Table.HeaderCell>Custo Final</Table.HeaderCell>
            <Table.HeaderCell>QR Code</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {finishedSpots.map(spot => (
            <Table.Row key={spot._id}>
              <Table.Cell>{spot.name}</Table.Cell>
              <Table.Cell>{spot.plate}</Table.Cell>
              <Table.Cell>R$ {spot.finalCost}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => generateQRCode(spot._id)}>Gerar QR Code</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default FinishedSpots;
