import React, {Component, useEffect, useState} from "react";
import ReactPlayer from "react-player";
import LoadingScreen from "../LoadingComponent/LoadingScreen";

import audio_icon from "../../Images/music_note_24px_outlined.png";
import folder_icon from "../../Images/folder.png";
import {FileList} from "./FileList";
import {GetFileMetadata, GetFileUrl, GetSnapshotInfo} from "../../BackendFunctions";
import {useParams} from "react-router";
import SnapshotInfo from "./SnapshotInfo";


function LoadingFiles(props) {

    const [loadComplete, setLoadComplete] = useState(0);
    const {repo_id, snap_id} = useParams();
    const [snapshot, setSnapshot] = useState(0);
    const [audio_objs, setAudioObjs] = useState(0);
    const [proj_objs, setProjObjs] = useState(0);

    function parseFileString(paths) {
        let audio_paths = [];
        let proj_paths = [];
        //console.log(file_paths);
        let file_paths;
        if (paths) {
            file_paths = paths.split(',');
        }
        if (file_paths) {
            file_paths.forEach(file_path => {
                if (file_path.indexOf('.mp3') !== -1 || file_path.indexOf('.wav') !== -1) {
                    audio_paths.push(file_path);
                } else {
                    proj_paths.push(file_path);
                }
            });
        }
        return [audio_paths, proj_paths]
    }

    useEffect(() => {
        if (!snapshot) {
            GetSnapshotInfo(snap_id).then(snap_snapshot => {
                setSnapshot(snap_snapshot);
                const file_paths = parseFileString(snap_snapshot.files);

                const audio_paths = file_paths[0];
                const proj_paths = file_paths[1];
                let tmp_audio_objs = [];
                let tmp_proj_objs = [];
                let id = 0;
                audio_paths.forEach(path => {
                    console.log('fetching', path);
                    GetFileUrl(path).then(u => {
                        let url = '';
                        u.map((link, key) => {
                            url = link;
                        });
                        let obj = {
                            id: id,
                            name: getName(path),
                            url: url
                        }
                        tmp_audio_objs.push(obj);
                        id++;
                    });
                });
                id = 0;
                proj_paths.forEach(path => {
                    console.log('fetching', path);
                    GetFileUrl(path).then(u => {
                        let url = '';
                        u.map((link, key) => {
                            url = link;
                        });
                        let obj = {
                            id: id,
                            name: getName(path),
                            url: url
                        }
                        tmp_proj_objs.push(obj);
                        id++;
                    });
                });
                setAudioObjs(tmp_audio_objs);
                setProjObjs(tmp_proj_objs);
                setLoadComplete(true);
            })
        }
    }, [audio_objs, proj_objs]);

    function getName(path) {
        const p = path.split('/');
        return p.slice(-1)[0];
    }

    return (
        <div>
            {!loadComplete
                ? <LoadingScreen message="Getting your files!"/>
                : <FileList
                    audio_objs={audio_objs}
                    proj_objs={proj_objs}
                    snapshot_name={props.snapshot_name}/>}
        </div>
    );
}

export default LoadingFiles;


/*export class LoadingFiles extends Component {
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
        let file_paths;
        if (this.props.snapshot_paths) {
            file_paths = this.props.snapshot_paths.split(',');
        }
        console.log(file_paths);
        if (file_paths) {
            file_paths.forEach(file_path => {
                if (file_path.indexOf('.mp3') !== -1 || file_path.indexOf('.wav') !== -1) {
                    audio_paths.push(file_path);
                } else {
                    proj_paths.push(file_path);
                }
            });
        }
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
                GetFileUrl(path).then(u => {
                    let url='';
                    u.map((link, key) => {
                        url = link;
                    });
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
                GetFileUrl(path).then(u => {
                    let url='';
                    u.map((link, key) => {
                        url = link;
                    });
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
        console.log(this.props.snapshot_paths);

        console.log(isLoading);
        return (
            isLoading
                ? <LoadingScreen message="Getting your files!"/>
                : <FileList
                    audio_objs={audio_objs}
                    proj_objs={proj_objs}
                    snapshot_name={this.props.snapshot_name}/>
        );
    }
}*/
