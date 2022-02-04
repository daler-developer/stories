import classNames from 'classnames'
import { useEffect, useMemo } from 'react'
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

  const icon = useMemo(() => {
    switch (alert.type) {
      case 'success':
        return 'check_circle'
      case 'error':
        return 'error_outline'
      default:
        return null
    }
  }, [alert.type])

  return !alert.isHidden ? (
    <div
      className={classNames(
        'alert',
        { 'alert--success': alert.type === 'success' || !alert.type },
        { 'alert--error': alert.type === 'error' }
      )}
    >
      <Icon className="alert__icon">
        {icon}
      </Icon>
      <span className="alert__text">{alert.text || 'Unknown error'}</span>
    </div>
  ) : null
}

export default Alert
