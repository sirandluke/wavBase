import React from 'react';
import { FacebookShareButton, TwitterShareButton} from 'react-share';

const ShareButtons = (props) => {
    return(
        <div>
            <FacebookShareButton
                url={window.location.href}
                title={"Check out '" + props.repo_name + "' on wavBase!"}
                hashtag={"#wavBase"}
                className="shareBtn col-md-1 col-sm-1 col-xs-1">
                <a className="twitter">
                    <i className="fa fa-facebook" aria-hidden="true"/>
                </a>
            </FacebookShareButton>

            <TwitterShareButton
                url={window.location.href}
                title={"Check out '" + props.repo_name + "' on wavBase!"}
                hashtag={"#wavBase"}
                className="shareBtn col-md-1 col-sm-1 col-xs-1">
                <a className="twitter">
                    <i className="fa fa-twitter" aria-hidden="true"/>
                </a>
            </TwitterShareButton>
        </div>
    );
}
export default ShareButtons