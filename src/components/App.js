import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

// import 'materialize-css/dist/css/materialize.css';
// import 'material-design-icons/iconfont/material-icons.css';
// import 'materialize-css/dist/js/materialize.min.js'

import Header from './Header';
import Main from './Main';
// import Footter from './components/Footter';


import CssBaseline from '@material-ui/core/CssBaseline';

const App =() => (
  <React.Fragment>
  <CssBaseline />
    <Router>
      <div>
        <Header/>
        <Main />
        {/* <Footter/>   */}
      </div>
    </Router>

    </React.Fragment>  
);

 export default App;
