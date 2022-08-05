import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col, Figure, Row } from 'react-bootstrap';

import './profile-view.scss';

export function FavoriteMovies(props) {
	const { movies, favoriteMovies, currentUser, token } = props;

	const favoriteMoviesList = movies.filter((m) => {
		return favoriteMovies.includes(m._id);
	})

	const handleDelete = (movieId) => {
		axios.delete(`https://myapiflix.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
			headers: { Authorization: `Bearer ${token}` }
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
                    <Col>
                        <h4>Favorite Movies</h4>
                    </Col>
                </Row>
                <Row>
                    {favoriteMoviesList.length === 0 ? (
                        <p>Fav list is empty! Add some movies!</p>
                    ) : (
                        favoriteMoviesList.map(({ ImageURL, Title, _id }) => {
                            return (
                                <Col xs={12} md={6} lg={3} key={_id} className='fav-movie'>
                                    <Figure>
                                        <Link to={`/movies/${_id}`}>
                                            <Figure.Image
                                                src= {ImageURL}
                                                alt= {Title}
                                            />
                                        
                                            <Figure.Caption>
                                                {Title}
                                            </Figure.Caption>
                                        </Link>
                                    </Figure>
                                    <Button variant='outline-secondary' onClick={() => { handleDelete(_id) }} >
                                                Remove
                                    </Button>
                                </Col>
                            )
                        })
                    )
                    }

                </Row>
            </Card.Body>
            
		</Card>
	)
}