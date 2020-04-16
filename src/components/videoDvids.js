import React from "react"
import PropTypes from "prop-types"

import dvidsVideoStyles from '../styles/dvids-video.module.scss'

const VideoDvids = (props) => {
  const videoDividsID = props.id.replace('video:', '');
  const videoTitle = props.title ? props.title : "YouTube Video";
  const videoAspect = props.aspectRatio ? props.aspectRatio : "16:9";

  // Derive the URL from the id.
  const videoUrl = 'https://www.dvidshub.net/video/embed/' + videoDividsID;

  // Calculate the proper aspect ratio & set it as the wrapper's padding-top % value for responsive goodness.
  // See https://css-tricks.com/aspect-ratio-boxes/
  // Use a 16:9 default ratio, 56.25%
  const aspectValues = videoAspect.split(':');
  const videoWidth = aspectValues[0] * 50;
  const videoHeight = aspectValues[1] * 50;
  // Adding 20px to the padding to compensate for the "View on dividshub.net" link.
  const aspectStyle = {
    paddingTop: "calc(" + (parseInt(videoHeight, 10) / parseInt(videoWidth, 10) * 100) + "% + 20px"
  }

  return (
    <div className={dvidsVideoStyles.dvidsVideoPlayerContainer}>
      <div className={dvidsVideoStyles.dvidsVideoPlayerWrapper} style={aspectStyle}>
        <div className={dvidsVideoStyles.dvidsVideoPlayer}>
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
            className={dvidsVideoStyles.iframe}
          ></iframe>
        </div>
      </div>
    </div>
  )
}

VideoDvids.propTypes = {
  id: PropTypes.string.isRequired
  }

export default VideoDvids