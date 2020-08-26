import React, { useState, Fragment } from 'react';
import { OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Don`t just use props, destructure your props object 
    const CallModal = ({children})=>{}
*/
const CallModal = ( props ) => {
    const [show, setShow] = useState(false)

    const handleOpen =()=> setShow(true)
    const handleClose =()=> setShow(false)

    return (
        <Fragment>
                <OverlayTrigger placement={props.OverLayPlace} overlay={<Tooltip >{props.TooltipText}</Tooltip>}>
                    <Button variant={props.variantBtn} size={props.sizeBtn} onClick={handleOpen} disabled={props.disabled} ><FontAwesomeIcon size='xs' icon={props.iconBtn}  /></Button>
                </OverlayTrigger>
                <Modal show={show} onHide={handleClose} centered size={props.sizeModal} >
                    <Modal.Header className={props.HeaderModalColor} closeButton >
                        <Modal.Title className='text-center w-100 text-white' >{props.titleModal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { props.children }
                    </Modal.Body>
                </Modal>
        </Fragment>
    )
}

export default CallModal