import React from 'react'
import ReactDOM from 'react-dom'
import {CSSTransition} from 'react-transition-group'
import CloseIcon from '@material-ui/icons/Close';
import './Modal.css'
import { IconButton } from '@material-ui/core';

const Modal = props => {
    return ReactDOM.createPortal(
        <CSSTransition in={props.show} unmountOnExit timeout={{enter:0, exit:300}}>
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2 className="modal-title">Add a friend</h2>
                        <IconButton onClick={props.onClose} color="inherit">
                            <CloseIcon />
                        </IconButton>
                        {/*<button className="button" onClick=>Close</button>*/}
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('root')
    )
}
export default Modal