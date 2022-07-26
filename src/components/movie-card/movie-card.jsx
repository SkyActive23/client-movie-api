import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
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
      <Card className='movie-card'>
        <Card.Body className='movie-body'>
          <Card.Title className='title'>{movie.Title}</Card.Title>
          <Card.Img className='movie-img' variant="top" src={movie.ImageURL}/>
          <Button className="add-button" onClick={() => this.addToFavoriteList(movie._id) }>Add</Button>
          <Link to={`/movies/${movie._id}`}>
              <Button className='open-button'>Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    })
  }).isRequired,
};