import React from 'react';
import ReactDOM from 'react-dom';
import UploadSnapshot from "../RepositoryPageComponents/UploadSnapshot";
import './SnapshotModal.css'


const SnapshotModal = ({ isShowing, hide, repo_id}) => isShowing ? ReactDOM.createPortal(

    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">close</span>
                    </button>
                </div>
                <UploadSnapshot repo_id={repo_id} />
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default SnapshotModal;