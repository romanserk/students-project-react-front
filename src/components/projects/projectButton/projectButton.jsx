import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';



const ProjectButton = (props) => {


    return (


        <>
            {props.singleProject.userID === props.userData.ID ?
                <Button variant="danger" className="btn btn-md mt-4" onClick={props.deleteHandler}>
                    Remove Project
                </Button>
                :
                props.loggedIn && !props.participant && props.singleProject.userID !== props.userData.ID ?
                    <Button variant="info" className="btn btn-md mt-4" onClick={() => props.joinHandler()}>
                        Join Project
                    </Button>
                    :
                    props.loggedIn && props.participant && props.singleProject.userID !== props.userData.ID ?
                        <Button variant="warning" className="btn btn-md mt-4" onClick={() => props.leaveHandler()}>
                            Leave Project
                        </Button>
                        :
                        null
            }
        </>



    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.users.isLoggedIn,
        userData: state.users.userData,
        singleProject: state.projects.singleProject,
        participant: state.projects.participant
    };
}



export default connect(mapStateToProps)(ProjectButton)