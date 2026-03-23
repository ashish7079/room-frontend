import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from "react-router-dom";

function Buy() {

const[name,setname] = useState("");
const[description,setdescription] = useState("");
const { id } = useParams();

const handleSubmit = async () => {
    try{
        const token = localStorage.getItem("token");
          if (!token) {
    alert("Please login first");
    return;
  }
    const res = await axios.post(`https://room-backend-production-d344.up.railway.app/user/buynow/${id}`,null,
        {
            params:{
        userName : name,
        description : description
    },
    
    headers:{
        Authorization : `Bearer ${token}`
    }
}
);
    console.log(res.data);
    alert("all");
}
catch(error){
    console.log(error);
    
    alert("error");
}
};
// navigate("/login");
  return (
   <div className='flex justify-center items-center'>
        <div className='justify-center items-center p-10 display-flex mt-10 bg-green-200 w-[300px] rounded-md'>

            {/*  */}
            <h1 className='font-bold text-3xl text-blue-500'> Buy  Now </h1> <br />

            {/*  */}

            <div> <span className='font-bold text-xl text-gray-700 '>Enter Your Name :-</span> <br /> <br />
                <input
                 type="text"
                  name="userName" 
                  placeholder='Enter Your Name'
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className='border-1 rounded-md  w-[225px] pl-5'
                  />
            </div><br />

            {/*  */}
            <div> <span className='font-bold text-xl text-gray-700 '>Send Your Message <br /> To RoomOwner :-</span><br /> <br />
                 <input
                 type="text"
                  name="password" 
                  placeholder='Enter Your Message'
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  className='border-1 rounded-md  w-[225px] pl-5'
                  />
            </div>

            <div className='flex justify-center items-center mt-5'> <button className='bg-blue-500 text-white w-[75px] rounded-sm' onClick={handleSubmit}>Submit</button></div>
            
        </div>
       
    </div>
  )
}

export default Buy