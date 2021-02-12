import { AppBar, Tab, Tabs } from '@material-ui/core';
import React, { useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { Task } from './task';
import { TaskAdd } from './taskadd';
import { TaskUpdate } from './taskupdate';

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
export function TaskIndex(){
    const {path,url}=useRouteMatch()
    return(
        <>
            <Navigation/>
            <br/>
            <br/>
            <Switch>
                <Route exact path={`${path}/`}>
                    <Task/>
                </Route>
               <Route exact path={`${path}addtask/`}>
                    <TaskAdd/>
                </Route>
                <Route exact path={`${path}updatetask/:id/`}>
                    <TaskUpdate/>
                </Route>
            </Switch>   
            </>
        );
}

function Navigation(props){
    const a=['/','/addtask']
    const [value, setValue] = useState(0)
    const history=useHistory()
    return(
        <AppBar position="" color="default">
                <Tabs
                value={value}
                onChange={(v,i)=>{setValue(i);history.push(a[i])}}
                indicatorColor="primary"
                textColor="primary"
                scrollButtons="auto"
                centered={true}
                >
                <Tab label="Task List" {...a11yProps(0)} />
                <Tab label="Add Task" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
    )
}