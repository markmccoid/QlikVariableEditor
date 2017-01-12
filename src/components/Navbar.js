import React from 'react';
import { Link } from 'react-router';

var Navbar = (props) => {
	return (
		<div className="row">
		<div className="columns ">
			<div className="top-bar" data-topbar role="navigation" style={{border: "1px solid hsla(0,0%,4%,.25)"}}>
				<div className="top-bar-left">
					<span className="title">React Redux Starter</span>
					<ul className="menu">
					  <li><Link to="/main" >Home</Link></li>
					  <li><Link to="/" >Login Mock</Link></li>
					</ul>
				</div>
				<div className="top-bar-right">
		      <ul className="menu">
		        <li><input type="search" placeholder="Search" /></li>
		        <li><button type="button" className="button">Search</button></li>
		      </ul>
		    </div>
			</div>
		</div>
		</div>
	);
};

export default Navbar;
