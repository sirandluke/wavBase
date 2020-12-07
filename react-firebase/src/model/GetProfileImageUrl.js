/*
import db from "../Database_config";
import {useCallback} from "react";

export function GetProfileImageUrl(image_path) {
    if (localStorage.getItem(image_path)) {
        return localStorage.getItem(image_path);
    }
    console.log('fetching url from firebase');
    return db.storage().ref().child(image_path).getDownloadURL().then(url => url);
}*/
