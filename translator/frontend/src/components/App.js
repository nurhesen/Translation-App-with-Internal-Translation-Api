import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import MainPage from "./MainPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";



export default function App (){






    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage/>
          </Route>
        </Switch>
      </Router>
    );
  }


  
const appDiv = document.getElementById("app");
render(<App />, appDiv);