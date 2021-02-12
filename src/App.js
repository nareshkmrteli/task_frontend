import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { TaskIndex } from './pages/task';

function App() {
  const {path}=useRouteMatch()
  const theme = createMuiTheme({
    spacing:8,
    mixins:{
      toolbar:{
        minHeight: 35
        }
     },
     typography:{
       fontSize:14,
     }
    })

  return (
  <span style={{backgroundColor:'white',marginBottom:'20px'}}>
  <ThemeProvider theme={theme}>
    <Switch>
      <Route path={`${path}`}>
        <TaskIndex/>
      </Route>
    </Switch>
  </ThemeProvider>
  </span>
  );
}

export default App;
