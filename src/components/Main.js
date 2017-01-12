import React from 'react';
//Import Components
import Navbar from 'Navbar';


class Main extends React.Component {
constructor(props) {
	super(props);

}
	render() {
		return (
			<div className="row">
				<div className="columns small-12">
					<Navbar />
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Main;
