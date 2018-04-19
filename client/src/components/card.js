import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './card.css';

class Card extends Component {

  state = {
    dragging: false,
    offset: {
      x: 0,
      y: 0
    },
    relative: null
  }
      
        cardStyle=()=> {
          return {
            height: `${this.props.height}px`,
            width: `${this.props.width}px`,
            borderRadius: `0 0 9px 9px`,
            border: '1px #ccc solid',
            backgroundClip: 'content-box',
            position: 'absolute',
            marginTop: `${this.props.index * 5}px`,
            backgroundColor: '#fff',
            zIndex: this.props.showDesc===false ? 100 - this.props.index : -1,
            fontSize: `20px`,
            transform: `translate(${this.state.offset.x}px, ${this.state.offset.y}px) rotate(${-(this.swipeMagnitude()) * 8}deg)`
          };
        }
      
        cardInfo=()=> {
          return <div style={this.cardInfoStyle()}>
            <div style={{ display: 'inline-block' }}>
              <span><strong>{this.props.title}</strong> ({this.props.rating}/10)</span>
            </div>
            <div style={{ display: 'inline-block', float: 'right' }}>
            </div>
          </div>;
        }
      
        cardInfoStyle=()=> {
          return {
            height: `${this.props.infoHeight}px`,
            padding: '20px 15px'
          };
        }
      
        likeNope=()=> {
          return <div>
            <div style={this.nopeStyle()}>Nope</div>
            <div style={this.likeStyle()}>Like</div>
          </div>;
        }
      
        likeNopeStyle=()=> {
          return {
            marginTop: '25px',
            position: 'absolute',
            borderRadius: `0 0 9px 9px`,
            textTransform: 'uppercase',
            fontSize: '30px',
            padding: '5px 10px',
            fontWeight: 'bold'
          };
        }
      
        likeStyle=()=> {
          return Object.assign(this.likeNopeStyle(), {
            left: 0,
            marginLeft: '20px',
            color: '#4bcc82',
            border: '6px solid #4bcc82',
            opacity: this.swipeMagnitude(),
            transform: 'rotate(-10deg)'
          });
        }
    
        nopeStyle=()=> {
          return Object.assign(this.likeNopeStyle(), {
            right: 0,
            marginRight: '20px',
            color: '#f78267',
            border: '6px solid #f78267',
            opacity: -this.swipeMagnitude(),
            transform: 'rotate(20deg)'
          });
        }
      
        startDragging=(x, y)=> {
          this.setState({
            dragging: true,
            start: { x, y }
          });
        }
      
        stopDragging=()=> {
          if (Math.abs(this.swipeMagnitude()) > 0.5) {
            this.props.onSwipe(this.props.index, this.swipeMagnitude() > 0);
          }
      
          this.setState({
            dragging: false,
            offset: {
              x: 0,
              y: 0
            }
          });
        }
      
        onDrag=(x, y)=> {
          this.setState({
            offset: {
              x: x - this.state.start.x,
              y: y - this.state.start.y
            }
          });
        }
      
        onTouchStart=(e)=> {
          e.preventDefault();
          e.stopPropagation()
          e = e.touches[0];
          this.startDragging(e.pageX, e.pageY);
        }
      
        onTouchEnd=(e)=> {
          e.preventDefault();
          e.stopPropagation()
          this.stopDragging();
        }
      
        onTouchMove=(e)=> {
          if (!this.state.dragging) return;
          e.preventDefault();
          e.stopPropagation()
          e = e.touches[0];
          this.onDrag(e.pageX, e.pageY);
        }
      
        onMouseDown = (e) => {
          if (e.button !== 0) return;
          this.startDragging(e.pageX, e.pageY);
          e.stopPropagation();
          e.preventDefault();
        }
      
        onMouseUp=(e)=> {
          if (e.button !== 0) return;
          this.stopDragging();
          e.stopPropagation();
          e.preventDefault();
        }
      
        onMouseMove=(e)=> {
          if (!this.state.dragging) return;
          this.onDrag(e.pageX, e.pageY);
          e.stopPropagation();
          e.preventDefault();
        }
      
        swipeMagnitude=()=> {
          return this.state.offset.x / this.props.width;
        }
      
        addMovementListeners=()=> {
          document.addEventListener('touchmove', this.onTouchMove);
          document.addEventListener('touchend', this.onTouchEnd);
          document.addEventListener('mousemove', this.onMouseMove);
          document.addEventListener('mouseup', this.onMouseUp);
        }
      
        removeMovementListeners=()=> {
          document.removeEventListener('touchmove', this.onTouchMove);
          document.removeEventListener('touchend', this.onTouchEnd);
          document.removeEventListener('mousemove', this.onMouseMove);
          document.removeEventListener('mouseup', this.onMouseUp);
        }
      
        componentDidUpdate=(props, state)=> {
          if (this.state.dragging && !state.dragging) {
            this.addMovementListeners();
          } else if (!this.state.dragging && state.dragging) {
            this.removeMovementListeners();
          }
        }
      
        componentWillUnmount=()=> {
          this.removeMovementListeners();
        }
      

        render() {
          const imageUrl = require(`./${this.props.picture}.jpg`)
          return <div style={this.cardStyle()} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
                      {this.likeNope()}
                      {this.cardInfo()}
                      <div className={style.xx} style={{backgroundImage:`url(${imageUrl})`, backgroundPosition: 'center top', backgroundSize: 'auto 100%',backgroundRepeat: 'no-repeat'}}></div>
                      
                  </div>;
        }
      }
  
      function mapStateToProps(state) {
        return {
            cards: state.cards,
            actualCard: state.actualCard,
            showDesc: state.showDesc
        }
    }
    export default connect(mapStateToProps)(Card)
