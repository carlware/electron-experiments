import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput } from "react-desktop/windows";
import * as settingsActions from "../actions/settings";
const { ipcRenderer } = window.require("electron");

class SettingsScreen extends Component {
  static defaultProps = {
    color: "#cc7f29",
    theme: "light"
  };

  componentDidMount() {
    ipcRenderer.send("settings:request");

    ipcRenderer.on("settings:response", (event, settings) => {
      this.props.setSettings(settings);
    });

    ipcRenderer.on("folder:change", (event, { folderPath }) => {
      this.props.changeFolder(folderPath);
    });
  }

  handleFolderSelection = () => {
    ipcRenderer.send("folder:select");
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <TextInput
          ref="folder"
          theme={this.props.theme}
          color={this.props.color}
          label="Download Path"
          placeholder="Select Download Path"
          style={{ width: "90%" }}
          value={this.props.settings.folderPath}
          onClick={this.handleFolderSelection}
          onChange={() => {}}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};

export default connect(
  mapStateToProps,
  settingsActions
)(SettingsScreen);
