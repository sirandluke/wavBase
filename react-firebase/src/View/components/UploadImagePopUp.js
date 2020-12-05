import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import db from "../../Realtime_Database_config";


export const UploadImagePopUp = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let storage = db.storage();
    let storageRef = storage.ref();
    let picture_name = username;
    let picture_storage = storageRef.child('defaults/');

    const handleUploadPicture = (event) => {
        event.preventDefault();
        let picture = new File([""], event.target.elements[0].value);
        console.log(picture);
        picture_storage.put(picture).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
        });
    }


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Edit Profile Picture
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Your Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={handleUploadPicture}>
                        <input name="file" type="file" accept="image/*"/>
                        <input name="token" type="hidden"/>
                        <input type="submit" value="submit"/>
                    </form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    );
}