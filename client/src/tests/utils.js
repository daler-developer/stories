import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "redux/store"


const Wrapper = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {children}
      </Provider>
    </BrowserRouter>
  )
}

const customRender = (ui, options) => {
  return render(ui, {wrapper: Wrapper, ...options})
}

export { customRender }
