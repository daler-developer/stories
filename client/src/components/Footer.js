import { useRef } from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsCreatingStory,
  storiesActions,
} from 'redux/reducers/storiesReducer'

const Footer = () => {
  const fileInputRef = useRef(null)

  const dispatch = useDispatch()

  const isCreating = useSelector((state) => selectIsCreatingStory(state))

  const resetFileInput = () => {
    fileInputRef.current.value = null
  }

  const handleCreateStoryBtnClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = async (e) => {
    const file = e.target.files[0]

    const form = new FormData()

    form.append('image', file, file.name)

    dispatch(storiesActions.createStory(form))

    resetFileInput()
  }

  return (
    <>
      <footer className="footer">
        <Button
          type="button"
          className="footer__create-story-btn"
          color="light"
          onClick={handleCreateStoryBtnClick}
          isLoading={isCreating}
        >
          Create story
        </Button>
      </footer>

      <input
        accept="image/*"
        type="file"
        onChange={handleChange}
        ref={fileInputRef}
        hidden
      />
    </>
  )
}

export default Footer
