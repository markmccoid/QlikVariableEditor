import React from 'react';
import { Link } from 'react-router';


const Navbar = (props) => {
		return (
			<div className="row">
			<div className="columns">
				<div className="top-bar" data-topbar role="navigation" style={{border: "1px solid hsla(0,0%,4%,.25)"}}>
					<div className="top-bar-left">
						<span className="title">React Redux Starter</span>
						<ul className="menu">
						  <li><Link to="/main" >Home</Link></li>
							<li><Link to="/addqvvar" >Add New Variable</Link></li>
							<li><Link to="/export" >Export</Link></li>
						</ul>
					</div>
					<div className="top-bar-right">

			    </div>
				</div>
			</div>
			</div>
		);
	};


export default Navbar;
