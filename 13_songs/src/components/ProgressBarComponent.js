import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-desktop/windows";
import { Line } from "rc-progress";

import { videoDone } from "../actions/video";

class ProgressBarComponent extends Component {
  static defaultProps = {
    color: "#cc7f29",
    theme: "light"
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.props.video.thumbnail && (
          <>
            <img alt="thumbnail" src={this.props.video.thumbnail} />
            <h3>{this.props.video.title}</h3>
          </>
        )}
        <Line
          percent={this.props.video.progress}
          strokeWidth="4"
          strokeColor={this.props.color}
        />
        {this.props.video.progress !== 100 && (
          <h4>{this.props.video.progress}%</h4>
        )}
        <h5>{this.props.video.message}</h5>
        {this.props.video.progress === 100 && (
          <Button
            push
            color={this.props.color}
            onClick={() => this.props.videoDone()}
          >
            Done
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    video: state.video
  };
};

export default connect(
  mapStateToProps,
  { videoDone }
)(ProgressBarComponent);
