import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Card from './card';
import { setCards, getActualCard, showDescription } from '../actions'
import style from './cards.css';

class Cards extends Component {


    componentWillMount = () =>{
        this.props.dispatch(setCards());
    }
    
      onCardSwipe=(card, like)=> {
        console.log(this.props.actualCard)
        this.props.cards.splice(card, 1);
        this.setState({
          cards: this.props.cards
        });
      }

      onAccept=()=> {
        console.log(this.props.actualCard)
        this.props.cards.splice(0, 1);
        this.setState({
          cards: this.props.cards
        });
        
      }

      onReject=()=> {
        console.log(this.props.actualCard)
        this.props.cards.splice(0, 1);
        this.setState({
          cards: this.props.cards
        });
      }

      showDesc=()=>{
        const card = this.props.actualCard;
        this.props.dispatch(showDescription(this.props.showDesc));
      }

    
      renderEmptyCard=()=> {
        return <div style={{
          backgroundColor: '#ccc',
          height: `${this.props.height}px`,
          width: `${this.props.width}px`,
          border: '2px #aaa solid',
          borderRadius: '0 0 9px 9px',
          position: 'absolute',
          zIndex: -1
        }}>
          <p style={{
            textAlign: 'center',
            width: '100%',
            marginTop: '50%',
            fontSize: '30px',
            color: '#555'
          }}>No cards left!</p>
        </div>;
      }
    
      renderCardStack=()=> {
        let cardsToShow = this.props.cards.slice(0, 1);
        this.props.dispatch(getActualCard(cardsToShow));
        return (
            cardsToShow.map((card, index) => (
                <div>
                <div className={style.description}>Hello!</div>
                <Card
                    height={this.props.height}
                    width={this.props.width}
                    {...card}
                    key={index}
                    index={index} 
                    onSwipe={this.onCardSwipe}
                />
                </div>
            ))
        )
    }
    
    
      render() {
            return <div style={{ fontFamily: 'Lato, sans-serif' }}>
                        {this.renderEmptyCard()}
                        {this.props.cards ? this.renderCardStack() : null }

                        <div className={style.buttons} style={{display:"flex",justifyContent:"space-between"}}>
                            <div onClick={this.onAccept} className={style.button}>
                                <FontAwesome 
                                    name={'fas fa-check-circle'} 
                                    /> Accept
                            </div>
                            <div onClick={this.showDesc} className={style.button3}>
                                <FontAwesome 
                                    name={'fas fa-info-circle'} 
                                    />
                            </div>
                            <div onClick={this.onReject} className={style.button2}>
                                <FontAwesome 
                                    name={'fas fa-times-circle'} 
                                    /> Reject
                            </div>
                        </div>

                    </div>;
      }
    
    };

    function mapStateToProps(state) {
        return {
            cards: state.cards,
            actualCard: state.actualCard,
            showDesc: state.showDesc
        }
    }
    export default connect(mapStateToProps)(Cards)

