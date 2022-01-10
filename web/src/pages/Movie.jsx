import React from 'react';
import _ from 'lodash';
import Loading from '../components/Loading.jsx';
import Carousel from '../components/Carousel.jsx';
// import EditableText from '../components/EditableText.jsx';
import UserRating from '../components/UserRating.jsx';
import {Link} from 'react-router-dom';
import * as MovieActions from '../redux/actions/MovieActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tagline: ''};
    this.handleStateChange = this.handleStateChange.bind(this);
  }
  componentDidMount() {
    var {id} = this.props.match.params;
    this.props.getMovie(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.clearMovie();
      var {id} = this.props.match.params;
      this.props.getMovie(id);
    }
  }

  componentWillUnmount() {
    this.props.clearMovie();
  }

  handleStateChange(e,value) {
    e.preventDefault();
    this.setState({tagline:value});
    // alert(this.state.tagline);
  }
  
  setMovieState(id,state){
    this.props.setMovieState(id,state);
  }

  render() {
    var {isFetching, movie, rateMovie, deleteMovieRating, profile} = this.props;
    return (
      <div className="nt-movie">
        {isFetching ? <Loading/> : null}
        {movie ?
          <div>
            <div className="row">
              <div className="small-12 medium-8 columns nt-movie-main">
                <div>
                  <div className="nt-box">
                    <button onClick={this.setMovieState.bind(this, movie.id, this.state)}>Save</button>
                    <p className="nt-box-row">
                      <strong>Movie ID: </strong><span>{movie.id}</span>
                    </p>
                    {profile
                      ?
                      <p className="nt-box-row nt-movie-rating">
                        <strong>Your rating: </strong>
                        <UserRating movieId={movie.id} savedRating={movie.myRating} onSubmitRating={rateMovie} onDeleteRating={deleteMovieRating}/>
                      </p>
                      :
                      null
                    }
                    <p className="nt-box-row">
                      <strong>Title: </strong>
                      <input Value={movie.title} onChange={this.handleStateChange}/>
                    </p>
                    <p className="nt-box-row">
                      <strong>Storyline: </strong>
                      <input Value={movie.tagline} onChange={this.handleStateChange}/>
                    </p>
                    <p className="nt-box-row">
                      <strong>Duration: </strong>
                      <input Value={`${movie.duration} mins`} onChange={this.handleStateChange}/>
                    </p>
                    <p className="nt-box-row">
                      <strong>Genres: </strong>
                      <span>{this.renderGenre(movie.genres)}</span>
                    </p>
                    <p className="nt-box-row">
                      <strong>Directed By: </strong>
                      <span>{this.renderPeople(movie.directors)}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="small-12 columns">
                <div className="nt-box">
                  <div className="nt-box-title">
                    Cast
                  </div>
                  <div>{this.renderCast(movie.actors)}</div>
                </div>
                <div className="nt-box">
                  <div className="nt-box-title">
                    Related
                  </div>
                  {this.renderRelatedMovies(movie.related)}
                </div>
              </div>
            </div>
          </div>
          :
          null
        }
      </div>
    );
  }

  getKeywordsText(movie) {
    _.filter(movie.keywords, k => {
      return !!k.name;
    })
      .join(', ');
  }

  renderCast(actors) {
    if (_.isEmpty(actors)) {
      return null;
    }

    return (
      <Carousel>
        {
          actors.map(a => {
            return (
              <div key={a.id.low}>
                <Link to={`/person/${a.id.low}`}>
                  <img src={a.poster_image} alt="" />
                </Link>
                <div className="nt-carousel-actor-name"><Link to={`/person/${a.id.low}`}>{a.name}</Link></div>
                <div className="nt-carousel-actor-role">{a.role}</div>
              </div>
            );
          })
        }
      </Carousel>);
  }

  renderRelatedMovies(movies) {
    if (_.isEmpty(movies)) {
      return null;
    }

    return (
      <Carousel>
        {
          movies.map(m => {
            return (
              <div key={m.id}>
                <Link to={`/movie/${m.id}`}>
                  <img src={m.poster_image} alt="" />
                </Link>
                <div className="nt-carousel-movie-title">
                  <Link to={`/movie/${m.id}`}>{m.title}</Link>
                </div>
              </div>
            );
          })
        }
      </Carousel>);
  }

  renderPeople(people) {
    return people.map((p, i) => {
      return (
        <span key={p.id}>
        <Link to={`/person/${p.id}`}>{p.name}</Link>
          {i < people.length - 1 ? <span>, </span> : null}
      </span>);
    });
  }

  renderGenre(genres) {
    return genres.map((g, i) => {
      return (<span key={g.id}>
        {g.name}
        {i < genres.length - 1 ? <span>, </span> : null}
      </span>);
    });
  }
}

// Movie.propTypes = {
//   onSubmitState: PropTypes.func.isRequired,
// };

function mapStateToProps(state) {
  return {
    movie: state.movies.detail,
    isFetching: state.movies.isFetching,
    profile: _.get(state, 'profile.profile')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MovieActions, dispatch);
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Movie);

Movie.displayName = 'Movie';
