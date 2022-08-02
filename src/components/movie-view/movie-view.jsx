import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

import './movie-view.scss';
import axios from 'axios';

export class MovieView extends React.Component {


    // Add a Favorite Movie
    addToFavoriteList(movieId) {
		const currentUser = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios.post(`https://myapiflix.herokuapp.com/users/${currentUser}/movies/${movieId}`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => {
				console.log(response.data)
				alert(`The movie was successfully add to your list.`)
			}).
			catch(error => console.error(error))
	}

	render() {
		const { movie, onBackClick } = this.props;
        
        return (
            <Card className="movie-view">
                <Col className='movie-col'>
                    <div className="movie-info">
                        <Col>
                            <Row>
                                <div className="movie-poster">
                                    <img className='movie-img' variant="top" src={movie.ImageURL} />
                                </div>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <div className="movie-title">
                                    <span className="label">Title: </span>
                                    <span className="value">{movie.Title}</span>
                                </div>
                            </Row>
                            <Row>
                                <div className="movie-description">
                                    <span className="label">Description: </span>
                                    <span className="value">{movie.Description}</span>
                                </div>
                            </Row>
                            <Row>
                                <div className="movie-genre">
                                    <span className="label">Genre: </span>
                                    <span className="value">{movie.Genre.Name}</span>
                                </div>
                            </Row>
                            <Row>
                                <div className="movie-director">
                                    <span className="label">Director: </span>
                                    <span className="value">{movie.Director.Name}</span>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <Link to={`/directors/${movie.Director.Name}`}>
                                        <Button className='director-button' variant="outline-primary">Director</Button>
                                    </Link>
                                </div>
                            </Row>
                            <Row>
                                <div className="director-bio">
                                    <span className="label">Bio: </span>
                                    <span className="value">{movie.Director.Bio}</span>
                                </div>
                            </Row>
                        </Col>
                    </div>
                    <Button className="add-button" id="favorites-btn" onClick={() => this.addToFavoriteList(movie._id)}>Add</Button>
                    <Button onClick={() => { onBackClick(null); }} className="back-button">Back</Button>
                </Col>
            </Card>
        );
    }
}

MovieView.propTypes = {
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
