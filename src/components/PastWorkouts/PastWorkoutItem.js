import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PastWorkout.css';
import Button from 'material-ui/Button';
import { Edit, Delete, Favorite, Update } from '@material-ui/icons';


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
               favorite: this.props.workout.favorite
            }
        }
    }


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
            return(<option key={exercise.id} value={exercise.id}>{exercise.exercise}</option>)
        })

        if (this.state.editMode) {
            return(<div className="viewItem"><p>Edit Workout</p>
                <form onSubmit={this.updateWorkout}>
                        <select onChange={this.handleChangeWorkout('exercise')}>
                            <option>--Exercise Type--</option>
                                    {exerciseArray}
                        </select>
                    <input type="number" placeholder={this.state.workoutInputs.weight} onChange={this.handleChangeWorkout('weight')}></input>
                    <input type="number" placeholder={this.state.workoutInputs.sets} onChange={this.handleChangeWorkout('sets')}></input>
                    <input type="number" placeholder={this.state.workoutInputs.reps} onChange={this.handleChangeWorkout('reps')}></input>
                    <input type="text" placeholder={this.state.workoutInputs.length} onChange={this.handleChangeWorkout('length')}></input>
                    <input type="text" placeholder={this.state.workoutInputs.details} onChange={this.handleChangeWorkout('details')}></input>
                    <Button size="small" variant="flat" color="primary" type="submit">Update< Update /></Button>
                    <Button size="small" variant="flat" color="primary" onClick={this.handleDeleteClick}>Remove< Delete /></Button>
                </form>
                    </div>)
            
        } else {
        return(<div className="viewItem"><h3>{this.props.workout.exercise}</h3><p>Weight: {this.props.workout.weight} lbs</p>
            <p>Sets: {this.props.workout.sets}</p><p>Reps per set: {this.props.workout.reps}</p><p>Duration: {this.props.workout.length}</p>
            <p>Details: {this.props.workout.details}{this.props.workout.favorite}</p>
            <Button size="small" variant="flat" color="primary" onClick={this.handleFavoriteClick}>Favorite< Favorite /></Button>
            <Button size="small" variant="flat" color="primary" onClick={this.handleEditClick}>Edit< Edit /></Button></div>)
            }
        }

}


export default connect(mapStateToProps)(PastWorkoutItem);