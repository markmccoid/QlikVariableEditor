import React from 'react';
//Import Components
import Navbar from 'Navbar';


class Main extends React.Component {
constructor(props) {
	super(props);

}
	render() {
		return (
			<div >

					<Navbar />
					{this.props.children}

			</div>
		);
	}
}

export default Main;
