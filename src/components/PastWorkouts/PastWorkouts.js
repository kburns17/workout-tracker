import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';


const mapStateToProps = reduxState =>({
    reduxState
});

class PastWorkouts extends Component {



    render() {
        return(
            <div>
                 <Nav />
                 <h2>Past Workouts</h2>
            </div>
        )
    }

}






export default connect(mapStateToProps)(PastWorkouts);