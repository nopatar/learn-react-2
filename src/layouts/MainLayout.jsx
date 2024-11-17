import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const MainLayout = () => {
  return (
    <>
    <Navbar />
      <main>
        <div className="px-4 md:px-6 pt-12 pb-24 w-full xl:w-[45%] space-y-6 shadow-lg">
        <Outlet />
        </div>
      </main>
    <Footer />
    <ToastContainer transition={Slide} />
    </>
  )
}
export default MainLayout