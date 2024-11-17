/* eslint-disable react/prop-types */
import { PulseLoader } from "react-spinners"

const Spinner = ({ loading }) => {
  return (
    <PulseLoader 
    color="#3b82f6" 
    loading={loading} 
    size={20} 
    cssOverride={{ margin: "48px", textAlign:"center" }}/>
  )
}

export default Spinner