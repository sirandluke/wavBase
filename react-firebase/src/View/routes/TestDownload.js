import React from "react";
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
import {DownloadSnapshotFolder} from "./DownloadSnapshotFolder";

const TestDownload = () => {

    return(
      <div>
          <h1>This is the Download Button test</h1>
          <DownloadSnapshotFolder repo_id="id1" snapshot_id="id2" />
      </div>
    );


}

export default TestDownload




/*
function Math(a, b) {

}

const Math = (a, b) => {

}

these are the same
 */