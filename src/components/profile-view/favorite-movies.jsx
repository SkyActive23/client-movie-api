import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Nav, Navbar, Form, Button, Card, CardGroup, Container, Row, Col, Figure } from 'react-bootstrap';
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
        <Fragment>
            {favoriteMoviesList.length === 0 ? (
                <p>You have no favorite movies yet.</p>
                ) : (
                    favoriteMoviesList.map((movie) => {
                        return (
                        <Col xs={10} sm={8} md={6} lg={4} >
                            <Card id="movie-card">
                                <Link to={`/movies/${movie._id}`}>
                                    <Card.Img variant="top" src={movie.ImagePath} />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Card.Text>{movie.Description}</Card.Text>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Button className="button" variant="outline-primary" size="sm">Open</Button>
                                    </Link>
                                    <Button 
                                        className="button ml-2" 
                                        variant="outline-primary" 
                                        size="sm" onClick={()=> {removeFav(movie._id)}} >
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        )
                    })
                )
            }
        </Fragment>
    )
}

export default FavoriteMovies