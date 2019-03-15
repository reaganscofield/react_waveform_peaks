import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Audio from './components/Audio';


ReactDOM.render(<Router>
                    <Switch>
                        <Route exact path='/' component={App}></Route>
                        <Route exact path='/audio' component={Audio}></Route>
                    </Switch>
                </Router>,
                document.getElementById('root') 
  );

  
serviceWorker.unregister();


// ReactDOM.render(<App />, document.getElementById('root'));


