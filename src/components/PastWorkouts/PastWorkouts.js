import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';


const mapStateToProps = reduxState =>({
    reduxState
});

class PastWorkouts extends Component {


componentDidMount(){
    //this.props.dispatch(fetchUser());
    this.props.dispatch({
        type: 'FETCH_WORKOUTS'
    })
}


    render() {
       console.log(this.props.state);
       
        //let workoutArray = this.props.
        return(
            <div>
                 <Nav />
                 <h2>Past Workouts</h2>
                 {/* {this.props.state.workoutReducer} */}
            </div>
        )
    }
}






export default connect(mapStateToProps)(PastWorkouts);