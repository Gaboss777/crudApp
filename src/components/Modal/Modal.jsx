import React, { useState, Fragment, cloneElement } from 'react';
import { OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CallModal = ( {OverLayPlace, TooltipText, variantBtn, sizeBtn, disabled, iconBtn, sizeModal, HeaderModalColor, titleModal, children} ) => {
    const [show, setShow] = useState(false)

    const handleOpen =()=> setShow(true)
    const handleClose =()=> setShow(false)

    return (
        <Fragment>
                <OverlayTrigger placement={OverLayPlace} overlay={<Tooltip >{TooltipText}</Tooltip>}>
                    <Button variant={variantBtn} size={sizeBtn} onClick={handleOpen} disabled={disabled} ><FontAwesomeIcon size='xs' icon={iconBtn}  /></Button>
                </OverlayTrigger>
                <Modal show={show} onHide={handleClose} centered size={sizeModal} >
                    <Modal.Header className={HeaderModalColor} closeButton >
                        <Modal.Title className='text-center w-100 text-white' >{titleModal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { cloneElement(children, {handleClose}) }
                    </Modal.Body>
                </Modal>
        </Fragment>
    )
}

export default CallModal