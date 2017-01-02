import React, { Component } from 'react';
class Apple extends Component {
	static defaultProps = {
		cords: null
	}

	static propTypes = {
	  	cords: React.PropTypes.object
	}

  render() {
    return (
    	<div className="apple" style={{top: this.props.cords.y, left: this.props.cords.x}}>
      		
      	</div>
    );
  }
}

export default Apple;
