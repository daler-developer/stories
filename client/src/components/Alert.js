import classNames from 'classnames'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectAlert, uiActions } from 'redux/reducers/uiReducer'
import Icon from './Icon'

const Alert = ({}) => {
  const alert = useSelector((state) => selectAlert(state))

  const dispatch = useDispatch()

  useEffect(() => {
    if (!alert.isHidden) {
      setTimeout(() => {
        dispatch(uiActions.closeAlert())
      }, 3000)
    }
  }, [alert.isHidden])

  return !alert.isHidden ? (
    <div
      className={classNames(
        'alert',
        { 'alert--success': alert.type === 'success' || !alert.type },
        { 'alert--error': alert.type === 'error' }
      )}
    >
      {/* {alert.type && ( */}
      <Icon className="alert__icon">
        {alert.type === 'success' && 'check_circle'}
        {alert.type === 'error' && 'error_outline'}
      </Icon>
      {/* // )} */}
      <span className="alert__text">{alert.text || 'Unknown error'}</span>
    </div>
  ) : null
}

export default Alert
