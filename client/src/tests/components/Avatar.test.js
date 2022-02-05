import { screen } from '@testing-library/react'
import Avatar from 'components/Avatar'
import { customRender } from 'tests/utils'

describe('<Avatar />', () => {
  const fakeUser = {
    _id: 'id002',
    username: 'daler',
    password: '112233',
    avatarUrl: '/api/file/avatar.png',
  }

  test('should render properly', () => {
    customRender(<Avatar user={fakeUser} />)
  })

  test('"className" prop should added to root element', () => {
    customRender(<Avatar className="test-class" user={fakeUser} />)

    expect(screen.getByRole('avatar')).toHaveClass('test-class')
  })

  test('"size" prop should generate proper class', () => {
    const { rerender } = customRender(<Avatar size="md" user={fakeUser} />)

    expect(screen.getByRole('avatar')).toHaveClass('avatar--size--md')

    rerender(<Avatar size="sm" user={fakeUser} />)

    expect(screen.getByRole('avatar')).toHaveClass('avatar--size--sm')
  })
})
