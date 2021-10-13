import React, {useState} from 'react';
import {HashRouter as Router, Switch} from "react-router-dom";
import './App.css'
import {ThemeProvider} from '@material-ui/styles';
import Navbar from "./components/navbar/Navbar";
import {theme} from "./test/utils/theme";
import {getRoutes} from "./utils/routes";

function App() {

    const [reload, setReload] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Navbar />
          <Switch>
              {getRoutes([reload, setReload])}
          </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
