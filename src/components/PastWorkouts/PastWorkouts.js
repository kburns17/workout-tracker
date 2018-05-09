import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import WorkoutItem from './PastWorkoutItem';

const mapStateToProps = reduxState =>({
    reduxState
});

class PastWorkouts extends Component {
    constructor(props){
        super(props)
        this.state={
           open: false,
       } 
    }

    //displays current workouts on page load
    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: 'FETCH_WORKOUTS'
        })
    }

    render() {
       
        let workoutArray = this.props.reduxState.workoutReducer.workoutReducer.map((workout)=>{
            return(<WorkoutItem key={workout.id} workout={workout} 
                                deleteWorkout={this.deleteWorkout} 
                                favoriteWorkout={this.favoriteWorkout}/>)
        });

        return(
            <div>
                 <Nav />
                 <h2>Past Workouts</h2>
                 {workoutArray}
                 {/* {JSON.stringify(this.props.reduxState.workoutReducer.workoutReducer)} */}
            </div>
        )
    }
}






export default connect(mapStateToProps)(PastWorkouts);