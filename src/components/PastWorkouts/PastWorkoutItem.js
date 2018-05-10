import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PastWorkout.css';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import { Edit, Delete, FavoriteBorder, Favorite, Update } from '@material-ui/icons';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import moment from 'moment';



const mapStateToProps = reduxState =>({
    reduxState
});

class PastWorkoutItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            editMode: false,
            favorited: this.props.workout.favorite,
            open: false,

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
        console.log(this.state.workoutInputs);
        
        this.setState({
            editMode: false, 
        })
        this.props.dispatch({
            type: 'UPDATE_WORKOUT',
            payload: this.state.workoutInputs
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
        this.props.dispatch({
            type: 'FAVORITE_WORKOUT',
            payload: this.props.workout
        })
        this.setState({
            favorited: !this.props.workout.favorite,
            open: true
        })
    }
    // handles the snackbar close, and resets state OPEN to false
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
        };

    render(){
        let exerciseArray = this.props.reduxState.workoutReducer.exerciseReducer.map((exercise)=>{ 
            return(<MenuItem key={exercise.id} value={exercise.id}>{exercise.exercise}</MenuItem>)
        })
        let workoutDate = moment(this.props.workout.date_of_workout).format('MMMM Do YYYY, h:mm a');
        // this will render if you are in editMode
        if (this.state.editMode) {
            return(<div><h3>Edit Workout</h3>
                <form onSubmit={this.updateWorkout}>
                        <TextField
                                id="select-exercise"
                                select
                                label="Exercise Type"
                                value={this.state.workoutInputs.exercise_id}
                                helperText="Please select an exercise" 
                                onChange={this.handleChangeWorkout('exercise_id')}>
                                        {exerciseArray}
                        </TextField>
                        <br></br>
                    <TextField  type="number" placeholder={this.state.workoutInputs.weight} onChange={this.handleChangeWorkout('weight')}/>
                    <br></br>
                    <TextField  type="number" placeholder={this.state.workoutInputs.sets} onChange={this.handleChangeWorkout('sets')}/>
                    <br></br>
                    <TextField  type="number" placeholder={this.state.workoutInputs.reps} onChange={this.handleChangeWorkout('reps')}/>
                    <br></br>
                    <TextField  type="text" placeholder={this.state.workoutInputs.length} onChange={this.handleChangeWorkout('length')}/>
                    <br></br>
                    <TextField  type="text" placeholder={this.state.workoutInputs.details} onChange={this.handleChangeWorkout('details')}/>
                    <br></br>
                    <Button size="small" variant="flat" color="primary" type="submit">Save< Update /></Button>
                    <Button size="small" variant="flat" color="primary" onClick={this.deleteWorkout}>Remove< Delete /></Button>
                </form></div>)
                    
        // this will render if any items are favorited
        } else if(this.state.favorited){
            return(<Card><h3>{this.props.workout.exercise}</h3><p>Weight: {this.props.workout.weight} lbs</p>
            <p>Sets: {this.props.workout.sets}</p><p>Reps per set: {this.props.workout.reps}</p><p>Duration: {this.props.workout.length}</p>
            <p>Details: {this.props.workout.details}</p>
            <p>Date: {workoutDate}</p>{this.props.workout.favorite}
            <Button size="small" variant="flat" color="primary" onClick={this.favoriteWorkout}>Favorite< Favorite />
            <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={2000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Added to Favorites</span>}
                        action={[
                            <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            // className={classes.close}
                            onClick={this.handleClose}
                            >
                            <CloseIcon />
                            </IconButton>,
                        ]}
                        />
            </Button>
            <Button size="small" variant="flat" color="primary" onClick={this.handleEditClick}>Edit< Edit /></Button></Card>)
        // this will render if editMode is not on, and nothing is favorited.
        } else {
            return(<Card><h3>{this.props.workout.exercise}</h3><p>Weight: {this.props.workout.weight} lbs</p>
                <p>Sets: {this.props.workout.sets}</p><p>Reps per set: {this.props.workout.reps}</p><p>Duration: {this.props.workout.length}</p>
                <p>Details: {this.props.workout.details}</p>
                <p>Date: {workoutDate}</p>{this.props.workout.favorite}
                <Button size="small" variant="flat" color="primary" onClick={this.favoriteWorkout}>Favorite< FavoriteBorder />
                <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={2000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Removed from Favorites</span>}
                        action={[
                            <IconButton key="close" aria-label="Close" color="inherit"
                            // className={classes.close}
                            onClick={this.handleClose}
                            ><CloseIcon />
                            </IconButton>,
                        ]}
                        /></Button>
                <Button size="small" variant="flat" color="primary" onClick={this.handleEditClick}>Edit< Edit /></Button></Card>)
                }
            }

}


export default connect(mapStateToProps)(PastWorkoutItem);