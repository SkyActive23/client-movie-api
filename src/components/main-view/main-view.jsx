import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
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

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
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

    //When a user successfully registers
    onRegistration(register) {
        this.setState({
            register,
        });
    }


    

    

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
            <Container className="Background">
                <Navbar variant="dark" expand="lg" className="nav">
                    <Container>
                        <Navbar.Brand href="#home">ApiFlix</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="movie">
                    <Row className="main-view justify-content-md-evenly m-0 p-8 align-items-center">
                        {selectedMovie
                            ? (
                                <Col md={14}>
                                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            )
                            : movies.map(movie => (
                                <Col md={6}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </Container>
        ); 


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
    }
}
export default MainView;