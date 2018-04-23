import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";

import Card from "../Card/Card";
import style from "./cards.scss";
import {
  showDescription,
  addToAccepted,
  addToRejected,
  getCards
} from "../actions";

class Cards extends Component {
  onCardSwipe = (card, like) => {
    let actualCard = this.props.cards.splice(card, 1);
    if (actualCard[0]) {
      this.props.cards.length === 1 ? this.loadmore() : null;
      this.setState({
        cards: this.props.cards,
        count: this.state ? this.state.count + 1 : 1
      });
      like === true
        ? this.props.dispatch(addToAccepted(actualCard[0]._id, "accept"))
        : this.props.dispatch(addToRejected(actualCard[0]._id, "reject"));
    }
  };

  onAccept = () => {
    let actualCard = this.props.cards.splice(0, 1);
    if (actualCard[0]) {
      this.props.dispatch(addToAccepted(actualCard[0]._id, "accept"));
      this.setState({
        cards: this.props.cards,
        count: this.state ? this.state.count + 1 : 1
      });
      this.props.showDesc ? this.showDesc() : null;
      this.props.cards.length === 1 ? this.loadmore() : null;
    }
  };

  onReject = () => {
    let actualCard = this.props.cards.splice(0, 1);
    if (actualCard[0]) {
      this.props.dispatch(addToRejected(actualCard[0]._id, "reject"));
      this.setState({
        cards: this.props.cards,
        count: this.state ? this.state.count + 1 : 1
      });
      this.props.showDesc ? this.showDesc() : null;
      this.props.cards.length === 1 ? this.loadmore() : null;
    }
  };

  showDesc = () => {
    this.props.cards[0]
      ? this.props.dispatch(showDescription(this.props.showDesc))
      : null;
  };

  loadmore = () => {
    this.props.dispatch(getCards(3, this.state.count + 2, this.props.cards));
  };

  renderEmptyCard = () => {
    return (
      <div
        style={{
          backgroundColor: "#ccc",
          height: `${this.props.height}px`,
          width: `${this.props.width}px`,
          border: "2px #aaa solid",
          borderRadius: "0 0 9px 9px",
          position: "absolute",
          zIndex: -1
        }}
      >
        <p
          style={{
            textAlign: "center",
            width: "100%",
            marginTop: "50%",
            fontSize: "30px",
            color: "#555"
          }}
        >
          No cards left!
        </p>
      </div>
    );
  };

  renderCardStack = () => {
    let cards = this.props.cards;
    let cardsToShow = cards ? cards.slice(0, 1) : null;

    return cardsToShow.map((card, index) => (
      <div key={index}>
        <div
          className={style.description}
          style={
            this.props.showDesc === false
              ? { opacity: "0" }
              : { opacity: "0.8" }
          }
        >
          {card.description}
        </div>
        {cards[index + 1] !== undefined ? (
          <Card
            height={this.props.height}
            width={this.props.width}
            {...cards[index + 1]}
            key={index + 1}
            index={index + 1}
            onSwipe={this.onCardSwipe}
          />
        ) : null}
        <Card
          height={this.props.height}
          width={this.props.width}
          {...card}
          key={index}
          index={index}
          onSwipe={this.onCardSwipe}
        />
      </div>
    ));
  };

  render() {
    return (
      <div style={{ fontFamily: "Lato, sans-serif" }}>
        {this.renderEmptyCard()}
        {this.props.cards ? this.renderCardStack() : null}
        <div
          className={style.buttons}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div onClick={this.onAccept} className={style.button}>
            <FontAwesome name={"fas fa-check-circle"} /> Accept
          </div>
          <div onClick={this.showDesc} className={style.button3}>
            <FontAwesome name={"fas fa-info-circle"} />
          </div>
          <div onClick={this.onReject} className={style.button2}>
            <FontAwesome name={"fas fa-times-circle"} /> Reject
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
    showDesc: state.showDesc
  };
}
export default connect(mapStateToProps)(Cards);
