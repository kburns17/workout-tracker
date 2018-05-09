import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PastWorkout.css';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import { Edit, Delete, FavoriteBorder, Favorite, Update } from '@material-ui/icons';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';


const mapStateToProps = reduxState =>({
    reduxState
});

class PastWorkoutItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            editMode: false,

            workoutInputs: {
               id: this.props.workout.id,
               exercise_id: this.props.workout.exercise_id,
               exercise: this.props.workout.exercise,
               weight: this.props.workout.weight,
               sets: this.props.workout.sets,
               reps: this.props.workout.reps,
               length: this.props.workout.length,
               details: this.props.workout.details,
               favorite: this.props.workout.favorite,
               date_of_workout: this.props.workout.date_of_workout
            }
        }
    }

    //GETS all exercises and SETS them to drop down on page load
    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_EXERCISES'
        })
    }  
    // updates workout in database to new inputs.
    // resets edit state to false to switch render to view workouts only
    updateWorkout = (workout) =>{
        this.props.dispatch({
            type: 'UPDATE_WORKOUT',
            payload: this.state.workoutInputs
        })
        this.setState({
            editMode: false, 

        })
    }
    // sets the state for new inputs when in edit mode
    handleChangeWorkout = (propertyName) => {
        return (event) => {
            this.setState({
                workoutInputs: {
                ...this.state.workoutInputs,
                [propertyName] : event.target.value,
                }
            });
        }
    }

    // toggles the render of edit mode on edit button click.
    handleEditClick = (event)=>{
        this.setState({
            editMode: true
        })
    }

    // removes a workout from DB
    deleteWorkout = ()=>{
        this.props.dispatch({
            type: 'DELETE_WORKOUT',
            payload: {
                item: this.props.workout, 
                user: this.props.reduxState.user
            }
        })
    }

    // bookmarks a workout as a favorite
    favoriteWorkout = ()=>{
        console.log('favorite clicked', this.props.workout);
        this.props.dispatch({
            type: 'FAVORITE_WORKOUT',
            payload: this.props.workout
        })
    }

    render(){
        let exerciseArray = this.props.reduxState.workoutReducer.exerciseReducer.map((exercise)=>{ 
            return(<MenuItem key={exercise.id} value={exercise.id}>{exercise.exercise}</MenuItem>)
        })

        if (this.state.editMode) {
            return(<div className="viewItem"><h3>Edit Workout</h3>
                <form onSubmit={this.updateWorkout}>
                        <TextField
                                id="select-exercise"
                                select
                                label="Exercise Type"
                                value={this.state.workoutInputs.exercise}
                                helperText="Please select an exercise" 
                                onChange={this.handleChangeWorkout('exercise')}>
                                        {exerciseArray}
                        </TextField>
                    <TextField  type="number" placeholder={this.state.workoutInputs.weight} onChange={this.handleChangeWorkout('weight')}/>
                    <TextField  type="number" placeholder={this.state.workoutInputs.sets} onChange={this.handleChangeWorkout('sets')}/>
                    <TextField  type="number" placeholder={this.state.workoutInputs.reps} onChange={this.handleChangeWorkout('reps')}/>
                    <TextField  type="text" placeholder={this.state.workoutInputs.length} onChange={this.handleChangeWorkout('length')}/>
                    <TextField  type="text" placeholder={this.state.workoutInputs.details} onChange={this.handleChangeWorkout('details')}/>
                    <Button size="small" variant="flat" color="primary" type="submit">Save< Update /></Button>
                    <Button size="small" variant="flat" color="primary" onClick={this.deleteWorkout}>Remove< Delete /></Button>
                </form>
                    </div>)
            
        } else {
            return(<div className="viewItem"><h3>{this.props.workout.exercise}</h3><p>Weight: {this.props.workout.weight} lbs</p>
                <p>Sets: {this.props.workout.sets}</p><p>Reps per set: {this.props.workout.reps}</p><p>Duration: {this.props.workout.length}</p>
                <p>Details: {this.props.workout.details}</p>
                <p>Date: {this.props.workout.date_of_workout}</p>{this.props.workout.favorite}
                <Button size="small" variant="flat" color="primary" onClick={this.favoriteWorkout}>Favorite< FavoriteBorder /></Button>
                <Button size="small" variant="flat" color="primary" onClick={this.handleEditClick}>Edit< Edit /></Button></div>)
                }
            }

}


export default connect(mapStateToProps)(PastWorkoutItem);