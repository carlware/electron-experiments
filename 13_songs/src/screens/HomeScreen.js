import React, { Component } from "react";
import { connect } from "react-redux";
import * as videoActions from "../actions/video";

import LinkComponent from "../components/LinkComponent";
import ProgressBarComponent from "../components/ProgressBarComponent";
const { ipcRenderer } = window.require("electron");

class HomeScreen extends Component {
  componentDidMount() {
    ipcRenderer.on("video:info", (event, info) => {
      this.props.getVideoInfo(info);
    });

    ipcRenderer.on("video:error", (event, error) => {
      this.props.videoError(error.message);
    });

    ipcRenderer.on("video:progress", (event, data) => {
      this.props.videoProgress(data);
    });

    ipcRenderer.on("video:end", event => {
      this.props.videoDownloaded();
    });
  }

  render() {
    if (this.props.video.downloading) return <ProgressBarComponent />;

    return <LinkComponent />;
  }
}

const mapStateToProps = state => {
  return { video: state.video };
};

export default connect(
  mapStateToProps,
  videoActions
)(HomeScreen);
