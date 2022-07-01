import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import './main-view.scss';
import { NavbarView } from '../navbar-view/navbar-view'
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view'
import { Nav, Navbar, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    getMovies(token) {
        axios.get('https://myapiflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // componentDidMount(){
    //     axios.get('https://myapiflix.herokuapp.com/movies')
    //         .then(response => {
    //             this.setState({
    //             movies: response.data
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //   }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        });
      }    

    render() {
        const { movies, user } = this.state;

      
        return (
            <Router>
                <NavbarView user={user} />
                <Row className="main-view justify-content-md-center">

                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;

                        return movies.map(m => (
                            <Col md={6} lg={4} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/login" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col md={8}>
                            <LoginView />
                        </Col>
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to='/'/>
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                        </Col>
                        if (movies.length ===0) return <div className='main-view'/>;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/genre/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    {/* route for link on main-view to profile-view */}
                    <Route path="/users/:username" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        if (!user) return <Redirect to="/" />
                        return <Col md={8}>
                            <ProfileView movies={movies} user={user === match.params.username} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    
                </Row>
            </Router>
            
        );
    }
};
            
        


        // return (
        //     <div className="main-view">
        //         {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        //         {selectedMovie
        //             ? (
        //                 <Row className="justify-content-md-center">
        //                     <Col md={8}>
        //                         <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        //                     </Col>
        //                 </Row>
        //             )   
        //             : (
        //                 <Row className="Justify-content-md-center">
        //                     {movies.map(movie => (
        //                         <Col md={3}>
        //                             <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
        //                         </Col>
        //                     ))}
        //                 </Row>
        //             )
        //         }
        //     </div>
        // );

export default MainView;