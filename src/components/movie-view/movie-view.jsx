import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

import './movie-view.scss';

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
                                <img src={movie.ImagePath} crossorgin="anonymous" />
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
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button variant="link">Genre</Button>
                                </Link>
                            </div>
                        </Row>
                        <Row>
                            <div className="movie-director">
                                <span className="director">Director: </span>
                                <span className="value">{movie.Director.Name}</span>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <Button variant="link">Director</Button>
                                </Link>
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

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired,
//         Description: PropTypes.string.isRequired,
//         ImagePath: PropTypes.string.isRequired,
//         Director: PropTypes.shape({
//             Name: PropTypes.string.isRequired,
//             Bio: PropTypes.string.isRequired,
//         }),
//         Genre: PropTypes.shape({
//             Name: PropTypes.string.isRequired,
//         })
//     }).isRequired,
// };
