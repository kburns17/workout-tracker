import React, { Component } from 'react';
import { connect } from 'react-redux';
 


const mapStateToProps = reduxState =>({
    reduxState
});

class PastWorkoutItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            editMode: false,

            workoutInputs: {
               exercise: this.props.workout.exercise,
               weight: this.props.workout.weight,
               sets: this.props.workout.sets,
               reps: this.props.workout.reps,
               length: this.props.workout.length,
               details: this.props.workout.details,
            }
        }
    }


    updateWorkout = () =>{
        this.setState({
            editMode: false, 
        })
        this.props.dispatch({
            type: '',
            payload: this.state.workoutInputs
        })
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


        return(<div><h3>{this.props.workout.exercise}</h3><p>{this.props.workout.weight}</p>
            <p>{this.props.workout.sets}</p><p>{this.props.workout.reps}</p><p>{this.props.workout.length}</p>
            <p>{this.props.workout.details}{this.props.workout.favorite}</p>
            <button onClick={this.handleDeleteClick}>Remove</button>
            <button onClick={this.handleFavoriteClick}>Favorite</button>
            <button onClick={this.handleEditClick}>Edit</button></div>)
            }

}




export default connect(mapStateToProps)(PastWorkoutItem);