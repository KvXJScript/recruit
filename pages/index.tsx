import type {NextPage} from 'next'
import React from 'react'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormElements from "../components/FormElements";
import SumFooter from "../components/SumFooter";

const Home: NextPage = () => {

    return (
        <div>
            <div className="flex justify-center items-center h-screen text-xl">
                <div className="w-1/2 h-1/2 ">
                    <FormElements/>
                    <SumFooter/>
                </div>
            </div>
          <ToastContainer/>
      </div>
  )
}

export default Home
