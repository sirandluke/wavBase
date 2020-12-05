import React, {Component} from "react";
import ReactPlayer from "react-player";

import db from "../../Model/base";
import LoadingScreen from "../LoadingComponent/LoadingScreen";

import audio_icon from "../../Images/music_note_24px_outlined.png";
import folder_icon from "../../Images/folder.png";

import sine_wave from "../../Images/sine_wave_1.png";

export class FileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            audio_objs: [],
            proj_objs: [],
        }
        this.storageRef = db.storage().ref()
    }

    async componentDidMount() {

        const file_paths = this.parseFileString();

        const audio_paths = file_paths[0];
        const proj_paths = file_paths[1];

        const objs = await this.getObjs(audio_paths, proj_paths);

        setTimeout('',10000);

        this.setState({
            isLoading: false,
            audio_objs: objs[0],
            proj_objs: objs[1]
        })


        console.log(this.state.audio_objs);
        console.log(this.state.proj_objs);
    }

    parseFileString() {
        let audio_paths = [];
        let proj_paths = [];
        let file_paths = this.props.snapshot_paths.split(',');
        console.log(file_paths);
        file_paths.forEach(file_path => {
            if (file_path.indexOf('.mp3') !== -1 || file_path.indexOf('.wav') !== -1) {
                audio_paths.push(file_path);
            } else {
                proj_paths.push(file_path);
            }
        });
        return [audio_paths, proj_paths]
    }

    async getObjs(audio_paths, proj_paths) {
        let audio_files = [];
        let proj_files = [];

        try {
            await audio_paths.forEach(path => {
                this.storageRef
                    .child(path)
                    .getDownloadURL()
                    .then((url) => {
                        let obj = {
                            name: this.getName(path),
                            url: url
                        }
                        audio_files.push(obj);
                    });
            });
            await proj_paths.forEach(path => {
                this.storageRef
                    .child(path)
                    .getDownloadURL()
                    .then((url) => {
                        let obj = {
                            name: this.getName(path),
                            url: url
                        }
                        proj_files.push(obj);
                    });
            });
        } catch (error) {
            console.log(error);
        }
        return [audio_files, proj_files];
    }

    getName(path) {
        const p = path.split('/');
        return p.slice(-1)[0];
    }

    render() {

        const audioFileElement = this.state.audio_objs.map(obj =>
            <tr key={ obj.name }>
                <td style={ {width: '500px', textAlign: 'left'} }>
                    <img className="audio_ico" src={ audio_icon } alt="audio_icon" height="20" width="20"/>
                    {/* console.log(obj.name) */ }
                    { /* obj.name */ }
                    <ReactPlayer url={ obj.url }/>
                </td>
            </tr>
        );

        const projectFileElement = this.state.proj_objs.map(obj =>
            <tr key={ obj.name }>
                <td style={ {width: '500px', textAlign: 'left'} }>
                    <img className="file_ico" src={ folder_icon } alt="file_icon" height="20" width="20"/>
                    {/* console.log(obj.name) */ }
                    { /* obj.name */ }
                    <ReactPlayer url={ obj.url }/>
                </td>
            </tr>
        );

        return (
            this.state.isLoading ? <LoadingScreen /> :
                <div>
                    <h3>Project Files</h3>
                    <table>
                        <thead>

                        </thead>
                        <tbody>
                        { projectFileElement }
                        { audioFileElement }
                        </tbody>
                    </table>
                </div>
        );
    }
}