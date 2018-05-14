import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import WorkoutItem from './PastWorkoutItem';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, {CardContent } from 'material-ui/Card';


const mapStateToProps = reduxState =>({
    reduxState
});

const styles = {
    root: {
        flexWrap: 'wrap',
        display: 'flex',
        margin: 'auto',
        width: 'auto',
        justify: 'center',
        },
    };

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
                 <h2>My Workouts</h2>
                 <div style={styles.root}>{workoutArray} </div>
            </div>
        )
    }
}






export default connect(mapStateToProps)(PastWorkouts);