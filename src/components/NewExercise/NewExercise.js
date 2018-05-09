import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const mapStateToProps = reduxState =>({
    reduxState
});


class NewExercise extends Component {
        constructor(props){
            super(props)
            this.state={
               exercise: '',
               open: false,
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
        this.setState({
            exercise: '',
            open: true
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
        };

    render(){
        return(
            <div>
                <Nav />
                <h2>Add New Exercise Type</h2>
                <form onSubmit={this.addNewExercise}>
                    <TextField type="text" value={this.state.exercise} placeholder="New Exercise Type" onChange={this.handleNameChange}></TextField>
                    <br></br>
                    <Button size="small" variant="raised" color="primary" type="submit">Add New Exercise</Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Success!</span>}
                        action={[
                            <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            // className={classes.close}
                            onClick={this.handleClose}
                            >
                            <CloseIcon />
                            </IconButton>,
                        ]}
                        />
                </form>
            </div>
        )
    }


}


export default connect(mapStateToProps)(NewExercise);