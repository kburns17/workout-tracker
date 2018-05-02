import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';


const mapStateToProps = reduxState =>({
    reduxState
});

class PastWorkouts extends Component {


    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: 'FETCH_WORKOUTS'
        })
    }


    render() {
       
        let workoutArray = this.props.reduxState.workoutReducer.workoutReducer.map((workout)=>{
            return(<div key={workout.id}><h3>{workout.exercise}</h3><p>{workout.weight}</p>
                   <p>{workout.sets}</p><p>{workout.reps}</p><p>{workout.length}</p><p>{workout.details}</p></div>)
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