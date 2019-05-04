import React, { Component } from "react";
import { connect } from "react-redux";
import { BounceLoader } from "react-spinners";
import * as categoryActions from "../actions/category";
import * as movieActions from "../actions/movie";

class Category extends Component {
  componentDidMount() {
    this.props.startFetchingCategories();
    this.props.getCategories();
  }

  renderCategories() {
    if (this.props.loading)
      return (
        <div className="col-md-8 col-md-offset-4">
          <BounceLoader />
        </div>
      );

    return (
      <div>
        <div className="col-md-12">
          <h2 className="categories-head-title">Categories</h2>
          <hr className="categories-head-title-br" />
        </div>
        {this.props.categories.map((item, i) => (
          <div key={i} className="col-md-12">
            <div
              className={`categories-item ${this.props.selected_category ===
                i && "categories-item-selected"}`}
              onClick={() => {
                this.props.selectCategory(i);
                this.props.startFetchingMovies();
                this.props.getMovies(i, 1);
              }}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return <div>{this.renderCategories()}</div>;
  }
}

const mapStateToProps = ({ category }) => {
  return category;
};

export default connect(
  mapStateToProps,
  {
    ...categoryActions,
    ...movieActions
  }
)(Category);
