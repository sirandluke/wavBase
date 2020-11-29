import React from "react";
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
import UploadSnapshot from "./UploadSnapshot";
import DropzoneUpload from "./DropzoneUpload";

const Repository = ({history}) => {
    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }


    return (
        <UploadSnapshot />
    );
}

export default Repository;