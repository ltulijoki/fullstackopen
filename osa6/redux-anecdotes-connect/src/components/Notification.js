import { connect } from 'react-redux'

const Notification = props => {
  const notification = props.notification

  if (notification === '') return

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.message
  }
}

export default connect(mapStateToProps)(Notification)