import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Button } from "react-desktop/windows";
import { startDownloading } from "../actions/video";

class LinkComponent extends Component {
  static defaultProps = {
    color: "#cc7f29",
    theme: "light"
  };

  handleButtonClick = e => {
    e.preventDefault();
    this.props.startDownloading(this.refs.url.value);
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <TextInput
          ref="url"
          theme={this.props.theme}
          color={this.props.color}
          label="Video URL"
          placeholder="Insert URL here"
          style={{ width: "90%" }}
        />
        {this.props.error && <h4>{this.props.error}</h4>}
        <Button push color={this.props.color} onClick={this.handleButtonClick}>
          Download
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.video.error
  };
};

export default connect(
  mapStateToProps,
  { startDownloading }
)(LinkComponent);
