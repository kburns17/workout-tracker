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

    handleNameChange = (propertyName) => {
        console.log('change');
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
                    <input type="text" placeholder="Exercise Type" onChange={this.handleNameChange('Exercise Type')}></input>
                    <input type="text" placeholder="Description" onChange={this.handleNameChange('Description')}></input>
                    <input type="number" placeholder="Sets" onChange={this.handleNameChange('Sets')}></input>
                    <input type="number" placeholder="Reps" onChange={this.handleNameChange('Reps')}></input>
                    <input type="text" placeholder="Length" onChange={this.handleNameChange('Length')}></input>
                    <input type="text" placeholder="Details" onChange={this.handleNameChange('Details')}></input>
                    <input type="submit" value="Add Workout"></input>
                </form>
            </div>
        )
    }
}





export default connect(mapStateToProps)(AddWorkout);