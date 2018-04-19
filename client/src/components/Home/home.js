import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './home.css';
import Card from '../card';
import Cards from '../cards';

class Home extends Component {

    render() {
        return (
            <div>
                <Cards height='350' width='297'/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        cards: state.cards,
        actualCard: state.actualCard,
        showDesc: state.showDesc
    }
}
export default connect(mapStateToProps)(Home)