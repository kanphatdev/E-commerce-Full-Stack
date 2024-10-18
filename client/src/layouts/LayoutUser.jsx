import { Outlet } from "react-router-dom"


const LayoutUser = () => {
  return (
    <div>
        <h1>main nav</h1>
        <Outlet/>
    </div>
  )
}

export default LayoutUser