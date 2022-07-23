import React from 'react';
import './director-view.scss';
import PropTypes from 'prop-types';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


export class DirectorView extends React.Component {


  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card text='dark' className="director-card">
        <Card.Header className="director-title">{director.Name}</Card.Header>
        <Card.Body className='card-body'>
          <Card.Text> Biography: {director.Bio}</Card.Text>
        </Card.Body>
        <Button className='back-button' onClick={() => { onBackClick(null); }}>Back</Button>
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