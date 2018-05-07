import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import Button from 'material-ui/Button';


const mapStateToProps = reduxState =>({
    reduxState
});


class NewExercise extends Component {
        constructor(props){
            super(props)
            this.state={
               exercise: ''
           } 
        }
    //handles state change for new exercise
    handleNameChange = (event) => {  
        this.setState({
            exercise: event.target.value
        })
    }    
    //on click, dispatches new exercise to redux to be placed into DB
    addNewExercise=(event)=>{
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_EXERCISE',
            payload: this.state
        })
    }


    render(){
        return(
            <div>
                <Nav />
                <h2>Add New Exercise Type</h2>
                <form onSubmit={this.addNewExercise}>
                <input type="text" placeholder="New Exercise" onChange={this.handleNameChange}></input>
                <Button size="small" variant="flat" color="primary" type="submit">Add New Exercise</Button>
                </form>
            </div>
        )
    }


}


export default connect(mapStateToProps)(NewExercise);