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
                // exercise_id: '',
                weight: '',
                sets: '',
                reps: '',
                length: '',
                details: ''
            }
        }

    handleNameChange = (propertyName) => {
            return (event) => {
                this.setState({
                    ...this.state,
                    [propertyName] : event.target.value,
                });
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
                    <select><option>--Exercise Type--</option></select>
                    <br></br>
                    <input type="text" placeholder="Weight" onChange={this.handleNameChange('weight')}></input>
                    <input type="number" placeholder="Sets" onChange={this.handleNameChange('sets')}></input>
                    <input type="number" placeholder="Reps" onChange={this.handleNameChange('reps')}></input>
                    <input type="text" placeholder="Length" onChange={this.handleNameChange('length')}></input>
                    <input type="text" placeholder="Details" onChange={this.handleNameChange('details')}></input>
                    <input type="submit" value="Add Workout"></input>
                </form>
            </div>
        )
    }
}





export default connect(mapStateToProps)(AddWorkout);