import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import WorkoutItem from './PastWorkoutItem';


const mapStateToProps = reduxState =>({
    reduxState
});

class PastWorkouts extends Component {

    //displays current workouts on page load
    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: 'FETCH_WORKOUTS'
        })
    }

    //removes workout
    // This function could be moved into PastWorkoutItem
    deleteWorkout = (workout)=>{
        console.log('delete clicked', workout, this.props.reduxState.user);
        this.props.dispatch({
            type: 'DELETE_WORKOUT',
            payload: {
                item: workout, 
                user: this.props.reduxState.user
            }
        })
    }

    // bookmarks a workout as a favorite
    // This function could be moved into PastWorkoutItem
    favoriteWorkout = (workout)=>{
        console.log('update clicked', workout);
        this.props.dispatch({
            type: 'FAVORITE_WORKOUT',
            payload: workout
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