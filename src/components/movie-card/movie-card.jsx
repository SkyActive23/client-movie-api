import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row, Figure } from 'react-bootstrap';
import axios from 'axios';
import './movie-card.scss';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  addToFavoriteList(movieId) {
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.post(`https://myapiflix.herokuapp.com/users/${currentUser}/movies/${movieId}`, 
    {},
    {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      console.log(response.data)
      alert(`The movie was successfully add to your list.`)
    }).
    catch(error => console.error(error))
  }
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Body className='movie-card'> 
              <Figure>
                  <Link to={`/movies/${movie._id}`}>
                      <Figure.Image
                        src= {movie.ImageURL}
                        alt= {movie.Title}
                      />
                      <Figure.Caption>
                        {movie.Title}
                      </Figure.Caption>
                  </Link>
              </Figure>
              <Button variant='outline-secondary' className="add-button" onClick={() => this.addToFavoriteList(movie._id) }>Add</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    })
  }).isRequired,
};