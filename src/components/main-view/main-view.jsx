import React from 'react';
import axios from 'axios';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount(){
        axios.get('https://myapiflix.herokuapp.com/movies')
            .then(response => {
                this.setState({
                movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
      }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    //When a user successfully registers
    onRegistration(register) {
        this.setState({
            register,
        });
    }

    onLoggedIn(user) {
        this.setState({
          user
        });
    }

    render() {
        const { movies, selectedMovie, user, registration } = this.state;

        if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
            <Row className="main-view justify-content-md-center">
                {selectedMovie
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    )
                    : movies.map(movie => (
                        <Col md={3}>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                        </Col>
                    ))
                }
            </Row>
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