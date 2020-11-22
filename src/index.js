import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';
import './index.css';

import Home from './components/home';
import Results from './components/results';
import Header from './components/header';
import Details from './components/details';
import Modal from './components/modal';
import Menu from './components/menu';
import Lost from './components/404';

const hist = createBrowserHistory();

const ModalSwitch = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  let location = useLocation();
  let background = location.state && location.state.background;
  return(
    <div>
      <Header openMenu={menuOpen} setOpenMenu={setMenuOpen}/>
      <Menu openMenu={menuOpen}/>
      <Switch location={background || location}>
        <Route exact path="/" component={Home}></Route>
        <Route path="/search/:movie" component={Results}></Route>
        <Route path="/movie/:id" component={Details}></Route>
        <Route path="*" component={Lost}></Route>
      </Switch>
      {background && <Route path="/movie/:id" component={Modal}></Route>}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router history={hist}>
      <ModalSwitch/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
