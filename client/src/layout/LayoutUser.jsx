import { Outlet } from "react-router-dom"


const LayoutUser = () => {
  return (
    <div>
      <h1 className="text-2xl">
        nav
      </h1>
         <Outlet/>
    </div>
  )
}

export default LayoutUser