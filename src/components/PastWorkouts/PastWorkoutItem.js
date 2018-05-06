import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PastWorkout.css';


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
            }
        }
    }


    updateWorkout = (workout) =>{
        this.setState({
            editMode: false, 
        })
        this.props.dispatch({
            type: 'UPDATE_WORKOUT',
            payload: this.state.workoutInputs
        })
    }

    handleChangeWorkout = (propertyName) => {
        return (event) => {
            this.setState({
                ...this.state.workoutInputs,
                [propertyName] : event.target.value,
            });
            console.log('in edit');
            
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
        if (this.state.editMode) {
            return(<div className="viewItem"><p>Edit Workout</p>
                    <input type="text" placeholder={this.state.workoutInputs.exercise} onChange={this.handleChangeWorkout('exercise')}/>
                    <input type="number" placeholder={this.state.workoutInputs.weight} onChange={this.handleChangeWorkout('weight')}></input>
                    <input type="number" placeholder={this.state.workoutInputs.sets} onChange={this.handleChangeWorkout('sets')}></input>
                    <input type="number" placeholder={this.state.workoutInputs.reps} onChange={this.handleChangeWorkout('reps')}></input>
                    <input type="text" placeholder={this.state.workoutInputs.length} onChange={this.handleChangeWorkout('length')}></input>
                    <input type="text" placeholder={this.state.workoutInputs.details} onChange={this.handleChangeWorkout('details')}></input>
                    <button onClick={this.updateWorkout}>Update</button>
                    <button onClick={this.handleDeleteClick}>Remove</button>
                    </div>)
            
        } else {
        return(<div className="viewItem"><h3>{this.props.workout.exercise}</h3><p>{this.props.workout.weight}</p>
            <p>{this.props.workout.sets}</p><p>{this.props.workout.reps}</p><p>{this.props.workout.length}</p>
            <p>{this.props.workout.details}{this.props.workout.favorite}</p>
            <button onClick={this.handleFavoriteClick}>Favorite</button>
            <button onClick={this.handleEditClick}>Edit</button></div>)
            }
        }

}


export default connect(mapStateToProps)(PastWorkoutItem);