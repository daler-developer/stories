import classNames from 'classnames'
import Button from 'components/Button'
import { useFormik } from 'formik'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams, Navigate } from 'react-router-dom'
import { authActions, selectIsAuthenticated } from 'redux/reducers/authReducer'
import * as Yup from 'yup'

const Auth = () => {
  const [params, setParams] = useSearchParams()

  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => selectIsAuthenticated(state))

  const tab = useMemo(() => {
    return params.get('tab')
  }, [params.get('tab')])

  useEffect(() => {
    if (!tab) {
      setParams({ tab: 'login' })
    }
  }, [])

  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .trim()
        .required('Required')
        .min(3, 'Too short')
        .max(15, 'Too long'),
      password: Yup.string()
        .trim()
        .required('Required')
        .min(3, 'Too short')
        .max(15, 'Too long'),
    }),
    async onSubmit({ username, password }) {
      if (tab === 'register') {
        await dispatch(authActions.register({ username, password })).unwrap()
      } else if (tab === 'login') {
        await dispatch(authActions.login({ username, password })).unwrap()
      }
      form.resetForm()
    },
  })

  if (isAuthenticated) {
    return <Navigate to="/home" />
  }

  return (
    <div className="auth">
      {/* Form */}
      <form className="auth__form" onSubmit={form.handleSubmit}>
        {/* Header */}
        <h1 className="auth__form-header">
          {tab === 'login' && 'Login'}
          {tab === 'register' && 'Register'}
        </h1>
        {/* Header */}

        {/* Username */}
        <div className="auth__form-group">
          <label htmlFor="username" className="auth__form-label">
            Username{' '}
            <span className="auth__error-text">
              {form.touched.username && form.errors.username}
            </span>
          </label>
          <input
            type="text"
            className={classNames('auth__form-input', {
              'auth__form-input--error':
                form.touched.username && form.errors.username,
            })}
            {...form.getFieldProps('username')}
          />
        </div>
        {/* Username */}

        {/* Password */}
        <div className="auth__form-group">
          <label htmlFor="username" className="auth__form-label">
            Password{' '}
            <span className="auth__error-text">
              {form.touched.password && form.errors.password}
            </span>
          </label>
          <input
            type="password"
            className={classNames('auth__form-input', {
              'auth__form-input--error':
                form.touched.password && form.errors.password,
            })}
            {...form.getFieldProps('password')}
          />
        </div>
        {/* Password */}

        {/* Submit */}
        <Button
          color="blue"
          isLoading={form.isSubmitting}
          className="auth__submit-btn"
          type="submit"
          disabled={!(form.isValid && form.dirty)}
        >
          {tab === 'login' && 'Login'}
          {tab === 'register' && 'Register'}
        </Button>
        {/* Submit */}

        {/* Footer */}
        <div className="auth__footer">
          {tab === 'login' && (
            <Link to="/auth?tab=register">Don't have an account? Register</Link>
          )}
          {tab === 'register' && (
            <Link to="/auth?tab=login">Already have an account? Login</Link>
          )}
        </div>
        {/* Footer */}
      </form>
      {/* Form */}
    </div>
  )
}

export default Auth
