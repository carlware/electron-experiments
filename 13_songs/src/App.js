import React, { Component } from "react";
import { NavPane, NavPaneItem } from "react-desktop/windows";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCogs } from "@fortawesome/free-solid-svg-icons";

import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import "./App.css";

library.add(faHome);
library.add(faCogs);

class App extends Component {
  static defaultProps = {
    color: "#cc7f29",
    theme: "light"
  };

  state = {
    selected: "Home"
  };

  render() {
    return (
      <NavPane
        openLength={200}
        push
        color={this.props.color}
        theme={this.props.theme}
      >
        <NavPaneItem
          title="Home"
          icon={<FontAwesomeIcon icon="home" />}
          theme="light"
          background="#ffffff"
          selected={this.state.selected === "Home"}
          onSelect={() => this.setState({ selected: "Home" })}
          padding="10px 20px"
          push
        >
          <HomeScreen />
        </NavPaneItem>
        <NavPaneItem
          title="Settings"
          icon={<FontAwesomeIcon icon="cogs" />}
          theme="light"
          background="#ffffff"
          selected={this.state.selected === "Settings"}
          onSelect={() => this.setState({ selected: "Settings" })}
          padding="10px 20px"
          push
        >
          <SettingsScreen />
        </NavPaneItem>
      </NavPane>
    );
  }
}

export default App;
