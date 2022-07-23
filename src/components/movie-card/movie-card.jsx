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
          {/* <Card.Img variant="top" src={movie.ImageURL}/> */}
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <Button className="add-button" onClick={() => this.addToFavoriteList(movie._id) }>Add</Button>
        <Link to={`/movies/${movie._id}`}>
            <Button className='open-button'>Open</Button>
        </Link>
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