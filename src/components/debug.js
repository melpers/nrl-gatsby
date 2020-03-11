import React from 'react';

const Debug = ({ data }) => {

  return (
    <React.Fragment>
        <p>Debug:</p>
        { process.env.NODE_ENV === "development" ? <pre>{JSON.stringify(data, null, 2)}</pre> : null }
    </React.Fragment>
  )
}

export default Debug;