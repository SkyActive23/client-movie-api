import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card, Figure } from 'react-bootstrap';

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

            <Card className='card'>
                <Card.Body className='movie-view'>
                    <Col>
                        <Figure>
                            <Figure.Image
                                src= {movie.ImageURL}
                            />
                        </Figure>
                        <Card.Text className='text-card'>
                            <Row>
                                <h5>Title:</h5> 
                            </Row> 
                            <Row>
                                <Card.Text>{movie.Title}</Card.Text>
                            </Row>
                            <Row>
                                <h5>Description: </h5> 
                            </Row>
                            <Row>
                                {movie.Description}
                            </Row>
                            <Row>
                                <h5>Genre:</h5> 
                            </Row>
                            <Row>
                                {movie.Genre.Name}
                            </Row>
                            <Row>
                                <h5>Director:</h5> 
                            </Row>
                            <Row>  
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    {movie.Director.Name}
                                </Link>
                            </Row>   
                        </Card.Text>
                    </Col> 
                    
                    <Button variant="outline-secondary"className="add-button" onClick={() => this.addToFavoriteList(movie._id) }>Add</Button>
                    <Button variant="secondary" onClick={() => { onBackClick(null); }} className="back-button">Back</Button>
                </Card.Body>
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
