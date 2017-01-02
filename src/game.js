import React, { Component } from 'react';
import _ from 'lodash';
import Snake from './snake.js';
import Apple from './apple';
import './game.css';

class Game extends Component {
constructor(props) {
	super(props);

         this.start_game_config = {
            snake_cords: [{x:50,y:50}],
            points: 0,
            game_over:false,
            apple_position: {x: 100, y: 100}
         }

	this.state = this.start_game_config;
	this.snake_speed = 200; // in ms
	this.snake_pixel_size = 10;
	
	this.direction = "right";

         this.snake_size = 4;

         this.on_game_ready = null;

	this.init();
}

componentDidMount() {
	document.addEventListener("keydown", this.handleKeydown.bind(this), false);
}

   init() {
   	this.startGame = this.startGame.bind(this);
   }

   handleKeydown(e) {
   	switch(e.code) {
   		case "ArrowDown":
                               e.preventDefault();
                               if(this.direction != "up")
   			this.direction = "down";
   			break;
   		case "ArrowUp":
                                e.preventDefault();
                                if(this.direction != "down")
   			this.direction = "up";
   			break;
   		case "ArrowRight":
                              e.preventDefault();
                              if(this.direction !=  "left")
   			this.direction = "right";
   			break;
   		case "ArrowLeft":
                              e.preventDefault();
                              if(this.direction != "right")
   			this.direction = "left";
   			break;
   	}
   }

   moveSnake() {
   	var current_snake_head = this.getSnakeHead();
   	var x=current_snake_head.x,y=current_snake_head.y;


   	switch(this.direction) {
   		case 'up':
   			y-=this.snake_pixel_size;
   		break;
   		case 'down': 
   			y+=this.snake_pixel_size;
   		break;

   		case 'left': 
   			x-=this.snake_pixel_size;
   		break;
   		case 'right':
   		default:
   			x+=this.snake_pixel_size;
   	}

   	if(this.validateNextCords(x, y))
   	{

	   	this.addToHeadOfSnake(x,y, () => {
                              if(this.snake_size < this.state.snake_cords.length) {
                                 this.removeFromSnakeTail(() => {
                                    this.isGrabedApple(x,y);
                                    setTimeout(this.moveSnake.bind(this), this.snake_speed)
                                 });
                              }
                              else {
                                 this.isGrabedApple(x,y);
                                 setTimeout(this.moveSnake.bind(this), this.snake_speed)
                              }
	   	})
   	}
   }

   validateNextCords(x, y) {
   	if(y < 0 || y > (this.refs.canvas.offsetHeight - this.snake_pixel_size) || x< 0 || x > (this.refs.canvas.offsetWidth - this.snake_pixel_size) || _.find(this.state.snake_cords, (o) => o.x == x && o.y == y) != undefined) {
   		this.gameOver();
   		return false;
   	}
   	return true;
   }

   getSnakeHead() {
   	return this.state.snake_cords[this.state.snake_cords.length-1];
   }

   addToHeadOfSnake(x,y, callback) {
   	this.setState(state => {
   			state.snake_cords.push({x:x, y:y});
   			return state;
   	},  callback);

   }

   removeFromSnakeTail(callback) {
   	// remove tail from snake cords
   	this.setState(state => {
   		let removed_tail_cords = state.snake_cords[0];
   		return state.snake_cords.splice(0,1);
   	}, callback);   	
   }

   isGrabedApple(x,y) {   	
      if(x == this.state.apple_position.x && y ==  this.state.apple_position.y) {
         this.setState({points: this.state.points+50});
         this.snake_size++;
         this.placeApple();
      }
   }

   placeApple() {
   	let cords = this.getRandomCleanPixel();
   	this.setState(state => state.apple_position= {x: cords.x, y: cords.y});
   }

   getRandomCleanPixel() {
      let x,y;
      do {
         x = ((this.refs.canvas.offsetWidth * Math.random())/this.snake_pixel_size << 0)*this.snake_pixel_size;
         y = ((this.refs.canvas.offsetHeight * Math.random())/this.snake_pixel_size << 0)*this.snake_pixel_size;
      } while( _.find(this.state.snake_cords, (o) => o.x == x && o.y == y) != undefined);
      return {x:x, y:y};
   }

   gameOver( callback) {
   	this.setState(state => state.game_over = true, callback);
   }

   startGame() {
      this.gameOver(function() {
         this.setState(state => this.start_game_config, function() {
               this.forceUpdate();
               this.moveSnake();
         });
      });
   }


  render() {
    return (
      <div className="Game">
      	<h3>Points: {this.state.points}</h3>
      	{(this.state.game_over) && 
      		<h1>
      			Game Over
      		</h1>
      	}
      	<div className="canvas" ref="canvas">
      		<Snake cords={this.state.snake_cords} px_size={this.snake_pixel_size} />
      		<Apple cords={this.state.apple_position} />
      	</div>
      	<button onClick={this.startGame} >Start Game </button>
      	
      </div>
    );
  }
}

export default Game;
