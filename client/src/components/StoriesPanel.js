import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
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

  useEffect(() => {
    if (panel.isHidden) {
      setSelectedStoryIndex(0)
    }
  }, [panel.isHidden])

  const hasNext = useMemo(
    () => selectedStoryIndex + 1 !== stories.length,
    [selectedStoryIndex, stories]
  )
  const hasPrevious = useMemo(
    () => selectedStoryIndex !== 0,
    [selectedStoryIndex, stories]
  )

  const dispatch = useDispatch()

  const goNext = () => {
    if (hasNext) {
      setSelectedStoryIndex(selectedStoryIndex + 1)
    }
  }

  const goPrevious = () => {
    if (hasPrevious) {
      setSelectedStoryIndex(selectedStoryIndex - 1)
    }
  }

  const handleCloseBtnClick = () => {
    dispatch(uiActions.closeStoriesPanel())
  }

  const handleGoPreviusBtnClick = () => goPrevious()

  const handleGoNextBtnClick = () => goNext()

  return panel.isHidden ? null : (
    <div className="stories-panel">
      {/* Go previous */}
      <button
        className={classNames('stories-panel__go-previous-btn', {
          'stories-panel__go-previous-btn--mute': !hasPrevious,
        })}
        onClick={handleGoPreviusBtnClick}
      >
        <Icon>chevron_left</Icon>
      </button>
      {/* Go previous */}

      {/* Img */}
      <div className="stories-panel__img-wrapper">
        <img
          src={stories[selectedStoryIndex].fileUrl}
          className="stories-panel__img"
        />
      </div>
      {/* Img */}

      {/* Go next */}
      <button
        className={classNames('stories-panel__go-next-btn', {
          'stories-panel__go-next-btn--mute': !hasNext,
        })}
        onClick={handleGoNextBtnClick}
      >
        <Icon>chevron_right</Icon>
      </button>
      {/* Go next */}

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
