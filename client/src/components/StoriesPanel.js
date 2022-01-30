import useOnClickOutside from "hooks/useOnOutsideClick";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStoriesByCreatorId } from "redux/reducers/storiesReducer";
import { selectStoriesPanel, uiActions } from "redux/reducers/uiReducer";
import { selectUserById } from "redux/reducers/usersReducer";


const StoriesPanel = () => {
  const panel = useSelector((state) => selectStoriesPanel(state))
  const selectedUser = useSelector((state) => selectUserById(state, panel.selectedUserId))
  const stories = useSelector((state) => selectStoriesByCreatorId(state, selectedUser?._id))

  console.log(stories)

  const bodyRef = useRef(null)

  useOnClickOutside(bodyRef, () => {
    dispatch(uiActions.closeStoriesPanel())
  }, [!panel.isHidden])

  const dispatch = useDispatch()

  return panel.isHidden ? null : (
    <div className="stories-panel">
      {/* Body */}
      <div className="stories-panel__body" ref={bodyRef}>
        {/* Img */}
        <img src={`/api/files/stories/${stories[0].filename}`} className="stories-panel__story-img" />
        {/* Img */}
      </div>
      {/* Body */}
    </div>
  )
};

export default StoriesPanel;
