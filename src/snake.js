import React, { Component } from 'react';
class Snake extends Component {
	static defaultProps = {
		cords: '',
		px_size: 1
	}

	static propTypes = {
	  	cords: React.PropTypes.array,
	  	px_size: React.PropTypes.number 
	}

  render() {
    return (
    	<div>
      		{this.props.cords.map( (cords,idx) =>  {
      			let isSnakeHead = this.props.cords.length-1 == idx;
      			//let px_size = isSnakeHead ? 50 : this.props.px_size;
      			return <div key={idx} className={"snake_pixel "+ (isSnakeHead ? 'snake_head' : '') } style={{left:cords.x, top:cords.y, width: this.props.px_size, height: this.props.px_size}} />
      		})}
      	</div>
    );
  }
}

export default Snake;
