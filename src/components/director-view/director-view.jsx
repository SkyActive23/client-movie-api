import React from 'react';
import './director-view.scss';
import PropTypes from 'prop-types';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


export class DirectorView extends React.Component {


  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card text='dark' className="directorCard">
        <Card.Header className="directorTitle">{director.Name}</Card.Header>
        <Card.Body>
          <Card.Text> Biography: {director.Bio}</Card.Text>
          <Button variant="warning" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
        <Button className="d-block mt-3" onClick={() => { onBackClick(null); }} variant="warning">Back</Button>
      </Card>
    )
  }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
    }).isRequired
};