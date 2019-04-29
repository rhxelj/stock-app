import React from 'react';
import { Link } from 'react-router-dom'


const Footter = () => (
    <div>
     <footer className="page-footer blue">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Proveedores APP</h5>
                <p className="grey-text text-lighten-4">App Alta Baja y Modificacion de probeedores.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  <li><Link to="/create" className="grey-text text-lighten-3">Create</Link></li>
                  <li><Link to="/read" className="grey-text text-lighten-3">Read</Link></li>
                  <li><Link to="/update" className="grey-text text-lighten-3">Update</Link></li>
                  <li><Link to="/delete" className="grey-text text-lighten-3">Delete</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2018 Copyright OrlandoLonas By CRUX
            </div>
          </div>
        </footer>
 
    </div>    

);

export default Footter;