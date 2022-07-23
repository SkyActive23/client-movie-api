import React from 'react';
import './genre-view.scss'
import PropTypes from 'prop-types';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (

      <Card text='dark' className="genreCard">
        <Card.Header>{genre.Name}</Card.Header>
        <Card.Body>
          <Button variant="warning" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
        <Button className="d-block mt-3" onClick={() => { onBackClick(null); }} variant="warning">Back</Button>
      </Card>
    )
  }

}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired
};