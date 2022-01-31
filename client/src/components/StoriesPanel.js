import useOnClickOutside from 'hooks/useOnOutsideClick'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectStoriesByCreatorId,
  storiesActions,
} from 'redux/reducers/storiesReducer'
import { selectStoriesPanel, uiActions } from 'redux/reducers/uiReducer'
import { selectUserById } from 'redux/reducers/usersReducer'
import Icon from './Icon'

const StoriesPanel = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)

  const panel = useSelector((state) => selectStoriesPanel(state))
  const selectedUser = useSelector((state) =>
    selectUserById(state, panel.selectedUserId)
  )
  const stories = useSelector((state) =>
    selectStoriesByCreatorId(state, selectedUser?._id)
  )

  const bodyRef = useRef(null)

  const dispatch = useDispatch()

  const goNext = () => {
    if (selectedStoryIndex + 1 === stories.length) return

    setSelectedStoryIndex(selectedStoryIndex + 1)
  }

  const goPrevious = () => {
    if (selectedStoryIndex === 0) return

    setSelectedStoryIndex(selectedStoryIndex - 1)
  }

  const handleCloseBtnClick = () => {
    dispatch(uiActions.closeStoriesPanel())
  }

  const handleGoPreviusBtnClick = () => goPrevious()

  const handleGoNextBtnClick = () => goNext()

  return panel.isHidden ? null : (
    <div className="stories-panel">
      {/* Body */}
      <div className="stories-panel__body" ref={bodyRef}>
        {/* Go previous */}
        <button
          className="stories-panel__go-previous-btn"
          onClick={handleGoPreviusBtnClick}
        >
          <Icon>chevron_left</Icon>
        </button>
        {/* Go previous */}

        {/* Img */}
        <img
          src={`/api/files/stories/${stories[selectedStoryIndex].filename}`}
          className="stories-panel__story-img"
        />
        {/* Img */}

        {/* Go next */}
        <button
          className="stories-panel__go-next-btn"
          onClick={handleGoNextBtnClick}
        >
          <Icon>chevron_right</Icon>
        </button>
        {/* Go next */}
      </div>
      {/* Body */}

      {/* Close */}
      <button
        type="button"
        className="stories-panel__close-btn"
        onClick={handleCloseBtnClick}
      >
        <Icon>close</Icon>
      </button>
      {/* Close */}
    </div>
  )
}

export default StoriesPanel
