import { useRef } from 'react'
import Button from "./Button";
import api from 'utils/api'

const Footer = () => {
  const fileInputRef = useRef(null)

  const handleCreateStoryBtnClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = async (e) => {
    const form = new FormData()
    
    form.append('image', e.target.files[0], 'test-name.jpg')

    await api.post('/api/stories', form)
  }

  return <>
    <footer className="footer">
      <Button
        type="button"
        className="footer__create-story-btn"
        color="light"
        onClick={handleCreateStoryBtnClick}
      >
        Create story
      </Button>
    </footer>

    <input type="file" onChange={handleChange} ref={fileInputRef} hidden />
  </>
};

export default Footer;
