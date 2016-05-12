import React from 'react'
import styles from './alert.scss'

export default class Alert extends React.Component {

  static get PropTypes () {
    return {
      text: React.PropTypes.string.isRequired,
      type: React.PropTypes.string,isRequired,
    }
  }

  static get defaultProps () {
    return {
      text: '',
      type: '',
    }
  }

  constructor (props) {
    super(props)
  }

  render () {
    let boxClass = ''

    switch (this.props.type) {
      case 'info':
        boxClass = `${ styles.box } ${ styles.boxInfo }`
        break
      case 'success':
        boxClass = `${ styles.box } ${ styles.boxSuccess }`
        break
      case 'warning':
        boxClass = `${ styles.box } ${ styles.boxWarning }`
        break
      case 'danger':
        boxClass = `${ styles.box } ${ styles.boxDanger }`
        break
      default:
        boxClass = `${ styles.box }`
        break
    }
    const messageClass = `${ styles.message }`

    return (
      <div className={ styles.root }>
        <div className={ boxClass }>
          <div className={ messageClass }>
            { this.props.text }
          </div>
        </div>
      </div>
    )
  }
}
