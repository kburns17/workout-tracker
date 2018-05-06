import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';


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

    // on click, dispatches new workout to redux to be picked up by reducer and added to DB
    addWorkout = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_WORKOUT',
            payload: this.state
        })
        console.log(this.state);
    }

    render(){
        // mapping over this reducer to get all exercises on the drop down options
        let exerciseArray = this.props.reduxState.workoutReducer.exerciseReducer.map((exercise)=>{ 
            return(<option key={exercise.id} value={exercise.id}>{exercise.exercise}</option>)
        })

        return(
            <div>
                <Nav />
                <h2>Add New Workout</h2>
                <form onSubmit={this.addWorkout}>
                        <select onChange={this.handleNameChange('exercise')}>
                            <option>--Exercise Type--</option>
                                    {exerciseArray}
                        </select>
                    <br></br>
                    <input type="number" placeholder="Weight" onChange={this.handleNameChange('weight')}></input>
                    <input type="number" placeholder="Sets" onChange={this.handleNameChange('sets')}></input>
                    <input type="number" placeholder="Reps" onChange={this.handleNameChange('reps')}></input>
                    <input type="text" placeholder="Duration" onChange={this.handleNameChange('length')}></input>
                    <input type="text" placeholder="Details" onChange={this.handleNameChange('details')}></input>
                    <input type="submit" value="Add Workout"></input>
                </form>
                                 {/* {JSON.stringify(this.props.reduxState.workoutReducer.exerciseReducer)} */}

            </div>
        )
    }
}





export default connect(mapStateToProps)(AddWorkout);