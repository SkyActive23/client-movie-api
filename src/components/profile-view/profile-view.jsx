import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import './profile-view.scss';
import axios from 'axios';
// import UserInfo from './user-info';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';


export function ProfileView(props) {
    const [ user, setUser ] = useState(props.user);
    const [ movies, setMovies ] = useState(props.movies);
    const [ favoriteMovies, setFavoriteMovies ] = useState([]);
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const getUser = () => {
        axios.get(`https://myapiflix.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            setUser(response.data);
            setFavoriteMovies(response.data.FavoriteMovies)
        })
        .catch(error => console.error(error))
    }

    useEffect(() => {
        getUser();
    }, [])

    const handleDelete = () => {
        axios.delete(`https://myapiflix.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(() => {
            alert(`The account ${user.Username} was successfully deleted.`)
            localStorage.clear();
            window.open('/register', '_self');
        }).
        catch(error => console.error(error))
    }

    return (
        <Container>
            <Row>
                <Col xs={12} sm={4}>
                    <Card>
                        <Card.Body>
                            <Card.Text>Username:</Card.Text>
                            <Card.Text>{user.Username}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={8}>
                    <Card>
                        <Card.Body>
                            <Card.Text>Email:</Card.Text>
                            <Card.Text>{user.Email}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={8}>
                    <Card>
                        <Card.Body>
                            <Card.Text>Birthday:</Card.Text>
                            <Card.Text>{user.Birthday}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <FavoriteMovies 
                    movies={movies}
                    favoriteMovie={favoriteMovies}
                    currentUser={currentUser}
                    token={token}/>
                {/* <Update handleSubmit={handleSubmit} handleUpdate={handleUpdate} /> */}
            </Row>
            <UpdateUser user={user}/>
            <Button className="d-block mt-5" variant="warning" onClick={handleDelete}>Delete profile</Button>
        </Container>
    );
}