import React, { Component } from "react";
import { connect } from "react-redux";

import { getCards } from "../../actions";
import Cards from "../../components/Cards/Cards";

class Home extends Component {
  componentWillMount() {
    this.props.dispatch(getCards());
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Cards height="350" width="297" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
    showDesc: state.showDesc,
    accepted: state.accepted,
    rejected: state.rejected
  };
}
export default connect(mapStateToProps)(Home);
