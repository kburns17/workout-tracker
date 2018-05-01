import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';

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

    handleNameChange = (event) => {  
        this.setState({
            exercise: event.target.value
        })
    }    

    addNewExercise=(event)=>{
        event.preventDefault();
        this.props.dispatch({
            type: 'NEW_EXERCISE',
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
                <input type="submit" value="Add New Exercise"></input>
                </form>
            </div>
        )
    }


}


export default connect(mapStateToProps)(NewExercise);