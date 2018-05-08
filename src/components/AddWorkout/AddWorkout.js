import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';



const mapStateToProps = reduxState =>({
    reduxState
});

class AddWorkout extends Component {
        constructor(props){
            super(props)
            this.state={
                exercise: '',
                weight: '',
                sets: '',
                reps: '',
                length: '',
                details: ''
            }
        }
    //Adds all exercises to drop down on page load
    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: 'FETCH_EXERCISES'
        })
    }   
    //handles change of state for new workout input
    handleNameChange = (propertyName) => {
            return (event) => {
                this.setState({
                    ...this.state,
                    [propertyName] : event.target.value,
                });
            }
    }

    // on click, dispatches new workout to redux to be picked up by reducer and added to DB
    addWorkout = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_WORKOUT',
            payload: this.state
        })
        this.setState({
                exercise: '',
                weight: '',
                sets: '',
                reps: '',
                length: '',
                details: ''
        })
        console.log(this.state);
    }

    render(){
        // mapping over this reducer to get all exercises on the drop down options
        let exerciseArray = this.props.reduxState.workoutReducer.exerciseReducer.map((exercise)=>{ 
            return(<MenuItem key={exercise.id} value={exercise.id}>{exercise.exercise}</MenuItem>)
        })

        return(
            <div>
                <Nav />
                <h2>Add New Workout</h2>
                <form onSubmit={this.addWorkout}>
                        <TextField
                                id="select-exercise"
                                select
                                label="Exercise Type"
                                value={this.state.exercise}
                                helperText="Please select an exercise"
                                onChange={this.handleNameChange('exercise')}>
                                        {exerciseArray}
                        </TextField>
                    <br></br>
                    <TextField type="number" value={this.state.weight} placeholder="Weight in lbs." onChange={this.handleNameChange('weight')}/>
                    <TextField type="number" value={this.state.sets} placeholder="Total Sets" onChange={this.handleNameChange('sets')}/>
                    <TextField type="number" value={this.state.reps} placeholder="Reps Per Set" onChange={this.handleNameChange('reps')}/>
                    <TextField type="text" value={this.state.length} placeholder="Duration" onChange={this.handleNameChange('length')}/>
                    <TextField type="text" value={this.state.details} placeholder="Workout Details" onChange={this.handleNameChange('details')}/>
                    <br></br>
                    <Button size="small" variant="raised" color="primary" type="submit">Add New Workout</Button>
                </form>
                                 {/* {JSON.stringify(this.props.reduxState.workoutReducer.exerciseReducer)} */}
            </div>
        )
    }
}





export default connect(mapStateToProps)(AddWorkout);