import React from "react"
import PropTypes from "prop-types"

import youtubeStyles from '../styles/youtube.module.scss'

const YoutubeVideo = (props) => {
    const videoUrl = props.url;
    const videoTitle = props.title ? props.title : "YouTube Video";
    // Use a 16:9 default ratio, 56.25%
    const videoHeight = props.height ? props.height : "450";
    const videoWidth = props.width ? props.width : "800";

    // Calculate the proper aspect ratio & set it as the wrapper's padding-top % value for responsive goodness.
    // See https://css-tricks.com/aspect-ratio-boxes/
    const aspectStyle = {
        paddingTop: (parseInt(videoHeight, 10) / parseInt(videoWidth, 10) * 100) + "%"
    }

    return (
        <div className={youtubeStyles.videoPlayerContainer}>
            <div className={youtubeStyles.videoPlayerWrapper} style={aspectStyle}>
                <div className={youtubeStyles.videoPlayer}>
                    <iframe
                        title={videoTitle}
                        src={videoUrl}
                        height={videoHeight}
                        width={videoWidth}
                        frameBorder="0"
                        allow="accelerometer; encrypted-media; gyroscope;"
                        webkitallowfullscreen="true"
                        mozallowfullscreen="true"
                        allowFullScreen
                        className={youtubeStyles.iframe}
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

YoutubeVideo.propTypes = {
    url: PropTypes.string.isRequired
  }

export default YoutubeVideo