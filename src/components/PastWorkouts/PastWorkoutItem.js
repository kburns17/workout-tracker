import React, { Component } from 'react';
import { connect } from 'react-redux';
 


const mapStateToProps = reduxState =>({
    reduxState
});

class PastWorkoutItem extends Component {

    handleDeleteClick = (event)=>{
        this.props.deleteWorkout(this.props.workout)
    }

    handleFavoriteClick = (event)=>{
        this.props.favoriteWorkout(this.props.workout)
    }
    

    render(){


        return(<div key={this.props.workout.id}><h3>{this.props.workout.exercise}</h3><p>{this.props.workout.weight}</p>
            <p>{this.props.workout.sets}</p><p>{this.props.workout.reps}</p><p>{this.props.workout.length}</p>
            <p>{this.props.workout.details}{this.props.workout.favorite}</p>
            <button onClick={this.handleDeleteClick}>Remove</button>
            <button onClick={this.handleFavoriteClick}>Favorite</button></div>)
            }

}




export default connect(mapStateToProps)(PastWorkoutItem);