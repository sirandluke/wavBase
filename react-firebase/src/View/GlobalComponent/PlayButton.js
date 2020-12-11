import '../../App.css';
import React, { Component, useState } from "react";
import db from "../../Model/base";
import ReactPlayer from "react-player";
import * as K from "../../Constants";
/* Do not delete
const PlayButton = (props) => {
    const [audio, loadAudio] = useState("");
    const storage= db.storage();
    const storageRef = storage.ref();
    const audioLoader = info => {
        storageRef.child('test_audio/test_piano.mp3').getDownloadURL().then( function (url) {

            // Download audio file directly
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                let blob = xhr.response;
                let objURL = URL.createObjectURL(blob)
            }
            xhr.open('GET', url);
            xhr.send();
            loadAudio(url)
            console.log(url)
        }).catch((error) => {
            //console.log(error);
            alert(K.unknown_err);
        })
      }
        return (
            <div>
                <ReactPlayer
                    url={loadAudio}
                    width="400px"
                    height="50px"
                    playing={false}
                    controls={true}
                    volume={1}
                    progressInterval={5000}
                    pip={true}
                />
            </div>
        );
}

export default PlayButton;
*/

export class PlayButton extends Component {
    constructor(props) {
        super(props);

        /* const [audio, loadAudio] = useState("");
        const storage= db.storage();
        const storageRef = storage.ref(); */
    }

    render() {
        return (
            <div>
                <ReactPlayer
                    url={this.props.audio}
                    width="400px"
                    height="50px"
                    playing={false}
                    controls={true}
                    volume={1}
                    progressInterval={5000}
                    pip={true}
                />
            </div>
        );
    }
}