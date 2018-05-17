import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';

const mapStateToProps = reduxState =>({
    reduxState
});


class Favorites extends Component {



render(){
    return(
        <div>
            <Nav />
            <h2>My Favorite Workouts</h2>
        </div>
    )


    }

}






export default connect(mapStateToProps)(Favorites);