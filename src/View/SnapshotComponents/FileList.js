import React, {Component} from "react";
import ReactPlayer from "react-player";
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import saveAs from 'file-saver';

import "./FileList.css"

import audio_icon from "../../Images/music_note_24px_outlined.png";
import folder_icon from "../../Images/folder.png";

export class FileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            audio_objs: this.props.audio_objs,
            proj_objs: this.props.proj_objs,
        }

        console.log(this.state.audio_objs);
        console.log(this.state.proj_objs);
    }

    handleDownloadAll(e) {
        let objs = [];
        this.state.audio_objs.forEach(obj => {
            objs.push(obj);
        });
        this.props.proj_objs.forEach(obj => {
            objs.push(obj)
        });
        let zip = new JSZip();
        let count = 0;
        let zipFilename = this.props.snapshot_name;
        objs.forEach( (obj) => {
            let filename = obj.name;
            console.log(obj.name);
            // loading a file and add it in a zip file
            JSZipUtils.getBinaryContent(obj.url, function (err, data) {
                if (err) {
                    throw err; // or handle the error
                }
                zip.file(filename, data, { binary: true });
                count++;
                if (count === objs.length) {
                    zip.generateAsync({ type: 'blob' }).then(function (content) {
                        saveAs(content, zipFilename);
                        console.log("done");
                    });
                }
            });
        });
    }

    render() {

        const audioFileElement = this.state.audio_objs.map(obj =>
            <tr key={ obj.id }>
                <td>
                    <img className="audio_ico" src={ audio_icon } alt="audio_icon" height="20" width="20"/>
                    { obj.name }
                </td>
                <td>
                    <ReactPlayer
                        url={ obj.url }
                        width="400px"
                        height="50px"
                        playing={ false }
                        controls={ true }
                        volume={0.5 }
                        progressInterval={ 5000 }
                        pip={ true }
                    />
                </td>
            </tr>
        );

        const projectFileElement = this.state.proj_objs.map(obj =>
            <tr key={ obj.id }>
                <td style={ {width: '200px', textAlign: 'left'} }>
                    <img className="file_ico" src={ folder_icon } alt="file_icon" height="20" width="20"/>
                    { obj.name }
                </td>
                <td>
                    <button className="download_file_btn">
                        <i className="fa fa-download"/>
                        <a href={obj.url} download={ obj.name }> Download File</a>
                    </button>
                </td>
            </tr>
        );

        return (
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <button className="download_all_btn" onClick={ () => this.handleDownloadAll()}>
                    <i className="fa fa-download"/>
                     Download All
                </button>
                <table>
                    <thead>

                    </thead>
                    <tbody>
                    { audioFileElement }
                    { projectFileElement }
                    </tbody>
                </table>
            </div>
        );
    }
}