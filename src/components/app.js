import React from 'react'

import Alert from './alert/alert.js'

export default class App extends React.Component {

  render () {
    return (
      <div>
        <Alert text="Alert text." type="info" />
        <Alert text="Alert text." type="success" />
        <Alert text="Alert text." type="warning" />
        <Alert text="Alert text." type="danger" />
      </div>
    )
  }
}
