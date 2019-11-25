import React from 'react';
import { Button } from 'react-bootstrap';
import AuthContext from '../../../context/authContext';



const ProjectButton = (props) => {


    return (

        <AuthContext.Consumer>
            {(context) =>
                <>
                    {props.project.userID === context.userData.ID ?
                        <Button variant="danger" className="btn btn-md" onClick={props.deleteHandler}>
                            Remove Project
                        </Button>
                        :
                        null
                    }
                    {context.userLoggedIn && !props.participant && props.project.userID !== context.userData.ID ?
                        <Button variant="info" className="btn btn-md" onClick={() => props.joinHandler(context)}>
                            Join Project
                        </Button>
                        :
                        null
                    }
                    {context.userLoggedIn && props.participant && props.project.userID !== context.userData.ID ?
                        <Button variant="warning" className="btn btn-md" onClick={() => props.leaveHandler(context)}>
                            Leave Project
                        </Button>
                        :
                        null
                    }
                </>
            }

        </AuthContext.Consumer>

    )
}

export default ProjectButton