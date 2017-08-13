import React from 'react';
import PropTypes from 'prop-types';

class Person extends React.Component {
	state = {
		active: false,
		smiling: false,
	}
	handleClick() {
		this.setState({active: !this.state.active});
	}
	componentDidMount () {
		// React.getDOMNode()
	}
	componentWillUnmount () {
		// remove event listeners (Flux Store, WebSocket, documen, etc.)
	}
	activeMessage() {
		return (this.state.active) ? 'is activted' : '';
	}
	render () {
		return (
			<div onClick={this.handleClick.bind(this)}>
				{this.props.name} {this.activeMessage.bind(this)}
			</div>
		);
	}
}

Person.defaultProps = {
	name: 'Guest'
};

Person.propTypes = {
	name: PropTypes.string
};

export default Person;
