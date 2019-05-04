import React, { Component } from "react";
import "./App.css";
import AddTodoWindow from "./components/AddTodoWindow";
import MainWindow from "./components/MainWindow";

class App extends Component {
  renderView() {
    let search = global.location.search;
    let params = new URLSearchParams(search);
    let window = params.get("window");

    if (window === "new_todo") return <AddTodoWindow />;

    return <MainWindow />;
  }

  render() {
    return this.renderView();
  }
}

export default App;
