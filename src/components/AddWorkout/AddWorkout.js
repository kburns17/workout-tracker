import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';




const mapStateToProps = reduxState =>({
    reduxState
});

class AddWorkout extends Component {
        constructor(props){
            super(props)
            this.state={
                exercise_id: '',
                weight: '',
                sets: '',
                reps: '',
                length: '',
                details: '',
                open: false
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

    // on click, dispatches new workout to redux to be picked up by reducer and added to DB.
    // then sets the state to clear inputs, and 'OPEN: true' for snackbar material-UI
    addWorkout = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_WORKOUT',
            payload: this.state
        })
        this.setState({
                exercise_id: '',
                weight: '',
                sets: '',
                reps: '',
                length: '',
                details: '',
                open: true,
        })
        console.log(this.state);
    }

    // removes snackbar and resets state of 'OPEN: false'
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
      };

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
                                value={this.state.exercise_id}
                                helperText="Please select an exercise"
                                margin="normal"
                                onChange={this.handleNameChange('exercise_id')}>
                                        {exerciseArray}
                                        
                        </TextField>
                    <br></br>
                    <TextField type="number" value={this.state.weight} placeholder="Weight in lbs." onChange={this.handleNameChange('weight')}/>
                    <br></br>
                    <TextField type="number" value={this.state.sets} placeholder="Total Sets" onChange={this.handleNameChange('sets')}/>
                    <br></br>
                    <TextField type="number" value={this.state.reps} placeholder="Reps Per Set" onChange={this.handleNameChange('reps')}/>
                    <br></br>
                    <TextField type="text" value={this.state.length} placeholder="Duration" onChange={this.handleNameChange('length')}/>
                    <br></br>
                    <TextField type="text" value={this.state.details} placeholder="Workout Details" onChange={this.handleNameChange('details')}/>
                    <br></br>
                    <Button size="small" variant="raised" color="primary" type="submit">Add New Workout</Button>
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
                        message={<span id="message-id">New Workout Added!</span>}
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
                </form>
                                 {/* {JSON.stringify(this.props.reduxState.workoutReducer.exerciseReducer)} */}
            </div>
        )
    }
}





export default connect(mapStateToProps)(AddWorkout);