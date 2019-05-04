import React, { Component } from "react";
import { connect } from "react-redux";
import { BounceLoader } from "react-spinners";
import * as movieActions from "../actions/movie";

class Movie extends Component {
  renderPagination() {
    return (
      <div className="col-md-12">
        <button
          className="btn navigation-button pull-left"
          disabled={this.props.page === 1}
          onClick={() => {
            this.props.startFetchingMovies();
            this.props.getMovies(
              this.props.selected_category,
              this.props.page - 1
            );
          }}
        >
          BACK
        </button>
        <button
          className="btn navigation-button pull-right"
          disabled={this.props.page === this.props.maxPage}
          onClick={() => {
            this.props.startFetchingMovies();
            this.props.getMovies(
              this.props.selected_category,
              this.props.page + 1
            );
          }}
        >
          FORWARD
        </button>
      </div>
    );
  }

  renderMovieItem(item, i) {
    return (
      <div key={i} className="col-md-3">
        <div className="movie-item">
          <img
            alt="movie"
            key={i}
            width="100"
            height="150"
            src={`${this.props.CATEGORY_FOLDER}/image/${item}`}
            onClick={() =>
              this.props.selectMovie(
                `${this.props.CATEGORY_FOLDER}/video/${item.replace(
                  "jpg",
                  "mp4"
                )}`
              )
            }
          />
          <br />
          <span className="movie-title">{item.replace(".jpg", "")}</span>
        </div>
      </div>
    );
  }
  renderMovies() {
    if (this.props.loading)
      return (
        <div className="col-md-2 col-md-offset-5">
          <BounceLoader />
        </div>
      );
    else if (!this.props.movies && this.props.selected_category === null)
      return <h1 className="movies-head-message">Select a Category</h1>;
    else if (!this.props.movies)
      return <h1 className="movies-head-message">No movies</h1>;
    return (
      <div className="row">
        <div className="col-md-12 movies-grid">
          {this.props.movies.map((item, i) => this.renderMovieItem(item, i))}
        </div>
        <div>{this.renderPagination()}</div>
      </div>
    );
  }

  render() {
    return <div>{this.renderMovies()}</div>;
  }
}

const mapStateToProps = ({ category, movie }) => {
  return {
    ...category,
    ...movie
  };
};

export default connect(
  mapStateToProps,
  movieActions
)(Movie);
