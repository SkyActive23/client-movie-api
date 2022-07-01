import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Nav, Navbar, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import './profile-view.scss'

export function FavoriteMovies({ props }) {
    const { movies, favoriteMovies, currentUser, token } = props;

    const favoriteMoviesId = favoriteMovies.map(m => m._id)

    const favoriteMoviesList = movies.filter(m => {
        return favoriteMoviesId.includes(m._id)
    })

    const removeFav = (movieId) => {
        axios.delete(`https://myapiflix.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(() => {
            alert(`The movie was successfully deleted.`)
            window.open('/users/:username', '_self');
        }).
        catch(error => console.error(error))
    }

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={12}>
                        <h4>Favorite Movies</h4>
                    </Col>
                </Row>
                <Row>
                    {favoriteMovieList.map(({movie}) => {
                        return(
                            <Col xs={12} md={6} lg={3} key={_id} className='fav-movie'>
                                <Figure>
                                <Link to={'/movies/${movies._id}'}>
                                    <Figure.Image
                                        src={movie.ImagePath}
                                        // alt={Title}
                                    />
                                    <Figure.Caption>
                                        {Title}
                                    </Figure.Caption>
                                    </Link>
                                </Figure>
                                <Button variant="secondary" onClick={() => removeFav(movie._id)}>Remove</Button>
                            </Col>
                        )
                    })
                    }
                </Row>
            </Card.Body>
        </Card>
    )
}

export default FavoriteMovies