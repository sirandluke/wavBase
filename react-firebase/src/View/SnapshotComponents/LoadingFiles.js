import React, {Component} from "react";
import ReactPlayer from "react-player";
import db from "../../Model/base";
import LoadingScreen from "../LoadingComponent/LoadingScreen";

import audio_icon from "../../Images/music_note_24px_outlined.png";
import folder_icon from "../../Images/folder.png";
import {FileList} from "./FileList";

export class LoadingFiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            audio_objs: null,
            proj_objs: null,
        };

        this.storageRef = db.storage().ref();
    }

    componentDidMount() {
        const file_paths = this.parseFileString();

        const audio_paths = file_paths[0];
        const proj_paths = file_paths[1];

        this.getObjs(audio_paths, proj_paths).then((objs) => {
            setTimeout(() => {
                this.setState({
                    isLoading: false,
                    audio_objs: objs[0],
                    proj_objs: objs[1]
                });
            }, 5000);
        });
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
        let audio_objs = [];
        let proj_objs = [];
        let id = 0;
        try {
            await audio_paths.forEach(path => {
                this.storageRef
                    .child(path)
                    .getDownloadURL()
                    .then((url) => {
                        let obj = {
                            id: id,
                            name: this.getName(path),
                            url: url
                        }
                        audio_objs.push(obj);
                        id++;
                    });
            });
            id = 0;
            await proj_paths.forEach(path => {
                this.storageRef
                    .child(path)
                    .getDownloadURL()
                    .then((url) => {
                        let obj = {
                            id: id,
                            name: this.getName(path),
                            url: url
                        }
                        proj_objs.push(obj);
                        id++;
                    });
            });
        } catch (error) {
            console.log(error);
        }
        return [audio_objs, proj_objs];
    }


    getName(path) {
        const p = path.split('/');
        return p.slice(-1)[0];
    }

    render() {

        const {isLoading, audio_objs, proj_objs} = this.state;

        console.log(isLoading);
        return (
            isLoading
                ? <LoadingScreen message="Getting your files!"/>
                : <FileList audio_objs={ audio_objs } proj_objs={ proj_objs }/>
        );
    }
}