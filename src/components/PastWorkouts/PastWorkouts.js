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
       console.log(this.state);
       
        // let workoutArray = this.props.reduxState.workoutReducer.map((workout)=>{
        //     return(<div key={workout.id}>{workout.exercise.id}{workout.weight}
        //             {workout.sets}{workout.reps}{workout.length}{workout.details}</div>)
        // });

        return(
            <div>
                 <Nav />
                 <h2>Past Workouts</h2>
                 {/* {workoutArray} */}
                 {JSON.stringify(this.props.state.workoutReducer)}
            </div>
        )
    }
}






export default connect(mapStateToProps)(PastWorkouts);