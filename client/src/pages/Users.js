import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown,Option } from "../components/Form";

class User extends Component {
    state = {
        userInfo: {},
        workouts: [],
        workoutType: "",
        rounds:"",
        movementName: "",
        reps: "",
        minutes: "",
        seconds: ""
      

    };
    componentDidMount() {
        const userName = this.props.match.params.name
        this.loadUser(userName)
       
    }
    loadUser = userName => {
        API.getUser(userName)
            .then(res => {
                this.setState({
                    userInfo: res.data, workouts: res.data.workouts, workoutType: "",
                    rounds: "",
                    movementName: "",
                    reps: "",
                    weight: "",
                    minutes: "",
                    seconds:""})

            })
            .catch(err => console.log(err));
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        let time = parseInt(this.state.minutes)*60 + parseInt(this.state.seconds);
        API.saveWorkouts({
            workoutType: this.state.workoutType,
            rounds: this.state.rounds,
            movementName: this.state.movementName,
            movementReps: this.state.reps,
            movementWeight: this.state.weight,
            time: time,
            createdBy: this.state.userInfo.userName
        }).then(res => this.loadUser(this.state.userInfo.userName))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>{this.state.userInfo.firstName} {this.state.userInfo.lastName}</h1>
                        </Jumbotron>
                        {this.state.workouts.length ? (
                            <List>
                                {this.state.workouts.map(workout => (
                                    <Row key={workout._id}>
                                        <Col size="md-3">
                                            {workout.workoutType}
                                        </Col>
                                        <Col size="md-3">
                                            
                                            Time: {Math.floor(workout.time/60)}:{workout.time%60}
                                        </Col>
                                        <Col size="md-3">
                                            Rounds: {workout.rounds}
                                        </Col>
                                        <Col size="md-3">
                                           
                                            {workout.movementReps}  {workout.movementName} at {workout.movementWeight} lbs
                                        </Col>
                                        
                                    </Row>
                                ))}
                            </List>
                        ) : (<h3>Future Workouts Go Here </h3>)}
                        
                    </Col>
                    <Col size="md-6">

                        <Jumbotron>
                            <h1>Stats Go here</h1>
                        </Jumbotron>


                        <h3>Log a Workout </h3>
                        <form>
                            <Row>
                                <Dropdown
                                    value={this.state.workoutType}
                                    onChange={this.handleInputChange}
                                    name="workoutType"
                                    placeholder="Workout Type"
                                >
                                    <Option name="For Time"/>
                                    <Option name="AMRAP"/>
                                    <Option name="Tabata"/>

                                </Dropdown>
                                
                            </Row>
                            <Row>
                                <Input
                                    value={this.state.rounds}
                                    onChange={this.handleInputChange}
                                    name="rounds"
                                    placeholder="Rounds"
                                />
                                <Input
                                    value={this.state.movementName}
                                    onChange={this.handleInputChange}
                                    name="movementName"
                                    placeholder="Movement"
                                />
                                <Input
                                    value={this.state.reps}
                                    onChange={this.handleInputChange}
                                    name="reps"
                                    placeholder="Reps"
                                />
                                <Input
                                    value={this.state.weight}
                                    onChange={this.handleInputChange}
                                    name="weight"
                                    placeholder="weight"
                                />
                            </Row>
                            <Row>
                                <Input
                                    value={this.state.minutes}
                                    onChange={this.handleInputChange}
                                    name="minutes"
                                    placeholder="Minutes"
                                />
                                :
                                <Input
                                    value={this.state.seconds}
                                    onChange={this.handleInputChange}
                                    name="seconds"
                                    placeholder="Seconds"
                                />
                            </Row>
                            
                            <FormBtn
                                disabled={!(this.state.rounds)}
                                onClick={this.handleFormSubmit}
                            >
                                Log Workout
                            </FormBtn>
                        </form>





                    </Col>
                </Row>
            </Container>
        );
    }
}

export default User