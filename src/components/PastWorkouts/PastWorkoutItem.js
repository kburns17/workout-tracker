import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PastWorkout.css';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import { Edit, Delete, FavoriteBorder, Update } from '@material-ui/icons';
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

    //Adds all exercises to drop down on page load
    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_EXERCISES'
        })
    }  
    //
    updateWorkout = (workout) =>{
        this.props.dispatch({
            type: 'UPDATE_WORKOUT',
            payload: this.state.workoutInputs
        })
        this.setState({
            editMode: false, 

        })
    }

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


    handleEditClick =(event)=>{
        this.setState({
            editMode: true
        })
    }

    handleDeleteClick = (event)=>{
        this.props.deleteWorkout(this.props.workout)
    }


    handleFavoriteClick = (event)=>{
        this.props.favoriteWorkout(this.props.workout)
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
                                helperText="Please select an exercise"                                onChange={this.handleChangeWorkout('exercise')}>
                                        {exerciseArray}
                        </TextField>
                    <TextField  type="number" placeholder={this.state.workoutInputs.weight} onChange={this.handleChangeWorkout('weight')}/>
                    <TextField  type="number" placeholder={this.state.workoutInputs.sets} onChange={this.handleChangeWorkout('sets')}/>
                    <TextField  type="number" placeholder={this.state.workoutInputs.reps} onChange={this.handleChangeWorkout('reps')}/>
                    <TextField  type="text" placeholder={this.state.workoutInputs.length} onChange={this.handleChangeWorkout('length')}/>
                    <TextField  type="text" placeholder={this.state.workoutInputs.details} onChange={this.handleChangeWorkout('details')}/>
                    <Button size="small" variant="flat" color="primary" type="submit">Save< Update /></Button>
                    <Button size="small" variant="flat" color="primary" onClick={this.handleDeleteClick}>Remove< Delete /></Button>
                </form>
                    </div>)
            
        } else {
            return(<div className="viewItem"><h3>{this.props.workout.exercise}</h3><p>Weight: {this.props.workout.weight} lbs</p>
                <p>Sets: {this.props.workout.sets}</p><p>Reps per set: {this.props.workout.reps}</p><p>Duration: {this.props.workout.length}</p>
                <p>Details: {this.props.workout.details}</p>
                <p>Date: {this.props.workout.date_of_workout}</p>{this.props.workout.favorite}
                <Button size="small" variant="flat" color="primary" onClick={this.handleFavoriteClick}>Favorite< FavoriteBorder /></Button>
                <Button size="small" variant="flat" color="primary" onClick={this.handleEditClick}>Edit< Edit /></Button></div>)
                }
            }

}


export default connect(mapStateToProps)(PastWorkoutItem);