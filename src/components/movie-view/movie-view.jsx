import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }
    
    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        
        return (
            <Container>
                <Col>
                    <div className="movie-view">
                        <Row>
                            <div className="movie-poster">
                                <img src={movie.ImagePath} crossOrigin="true" />
                            </div>
                        </Row>
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
                                <span className="genre">Genre: </span>
                                <span className="value">{movie.Genre.Name}</span>
                            </div>
                        </Row>
                        <Row>
                            <div className="movie-director">
                                <span className="director">Director: </span>
                                <span className="value">{movie.Director.Name}</span>
                            </div>
                        </Row>
                        <Row>
                            <div className="director-bio">
                                <span className="director">Bio: </span>
                                <span className="value">{movie.Director.Bio}</span>
                            </div>
                        </Row>
                        <Row>
                            <button onClick={() => { onBackClick(null); }} className="button">Back</button>
                        </Row>
                    </div>
                </Col>
            </Container>
        );
    }
}