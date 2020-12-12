import React from 'react';
import { FacebookShareButton, TwitterShareButton} from 'react-share';
import { SocialIcon } from 'react-social-icons';
import './ShareButtons.css';

const ShareButtons = (props) => {

    const handleShare = (event) => {
        event.preventDefault();
        const el = document.createElement('textarea');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert(window.location.href + ' copied to your clipboard');
    }

    return(
        <div>
            <div className="spiny-spin-1">
                <SocialIcon onClick={handleShare}
                            style={{cursor: 'pointer'}}/>
            </div>
            <div className="spiny-spin-2">
                <FacebookShareButton
                    url={window.location.href}
                    title={`Check out ${props.repo_owner}'s ${props.repo_name} on wavBase!`}
                    round={true}
                    bgStyle={'fill'}
                    hashtag={"#wavBase"}
                    className="shareBtn col-md-1 col-sm-1 col-xs-1">
                    <SocialIcon url="https://facebook.com"/>
                </FacebookShareButton>
            </div>
            <div className="spiny-spin-3">
                <TwitterShareButton
                    url={window.location.href}
                    title={`Check out ${props.repo_owner}'s ${props.repo_name} on wavBase!`}
                    iconFillColor={'cyan'}
                    className="shareBtn col-md-1 col-sm-1 col-xs-1">
                    <SocialIcon url="https://twitter.com"/>
                </TwitterShareButton>
            </div>

        </div>
    );
}
export default ShareButtons