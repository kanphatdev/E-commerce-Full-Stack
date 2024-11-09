import { Outlet } from "react-router-dom"
import Mainnav from "../components/Mainnav"


const Layout = () => {
  return (
    <div>
     <Mainnav/>
      <main className="">
        <Outlet/>
      </main>
        
    </div>
  )
}

export default Layout