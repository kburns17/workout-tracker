import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import FavoriteWorkout from '../'

const mapStateToProps = reduxState =>({
    reduxState
});


class Favorites extends Component {


    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: 'FETCH_WORKOUTS'
        })
    }


    render(){

        let workoutArray = this.props.reduxState.workoutReducer.workoutReducer.map((workout)=>{
                return(<div key={workout.id} workout={workout}></div>)
        });

        return(
            <div>
                <Nav />
                <h2>Page coming soon</h2>
                <div>{workoutArray}</div>
                {/* {JSON.stringify(this.props.reduxState.workoutReducer.workoutReducer)} */}
            </div>
                )
        }

}







export default connect(mapStateToProps)(Favorites);