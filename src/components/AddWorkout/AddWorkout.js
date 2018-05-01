import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';


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


    addWorkout = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_WORKOUT',
            payload: this.state
        })
    }

    render(){
        return(
            <div>
                <Nav />
                <h2>Add New Workout</h2>
                <form onSubmit={this.addWorkout}>
                    <input type="text" placeholder="Exercise Type"></input>
                    <input type="text" placeholder="Description"></input>
                    <input type="number" placeholder="Sets"></input>
                    <input type="number" placeholder="Reps"></input>
                    <input type="text" placeholder="Length"></input>
                    <input type="text" placeholder="Details"></input>
                    <input type="submit" value="Add Workout"></input>
                </form>
            </div>
        )
    }
}





export default connect(mapStateToProps)(AddWorkout);