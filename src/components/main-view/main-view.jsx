import axios from 'axios';
import React from 'react';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { Col, Row } from 'react-bootstrap';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import './main-view.scss';

// #0
import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/


// #2 export keyword removed from here
class MainView extends React.Component {
    constructor(){
        super();
        //  #3 movies state removed from here
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://myapiflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(response => {
                // #4
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
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

        // #5 movies is extracted from this.props rather than from the this.state
        let { movies } = this.props;
        let { user } = this.state;
    
        return (
            <Router className='main-view'>
                <NavbarView user={user} />
                <Row className="main-view justify-content-md-center">

                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;

                        return <MoviesList movies={movies} />;
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
                        return <Col md={12}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={12}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/genre/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={12}>
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
                        return <Col md={12}>
                            <ProfileView movies={movies} user={user === match.params.username} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    
                </Row>
            </Router>
              );
        }
    }
    
    // #7
    let mapStateToProps = state => {
        return { movies: state.movies, user:StorageEvent.user }
    }
    
    // #8
    export default connect(mapStateToProps, { setMovies } )(MainView);
       

        