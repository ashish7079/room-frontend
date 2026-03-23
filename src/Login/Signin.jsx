import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Signin() {

    const[name,setname] = useState("");
    const[password,setpassword] = useState("");
const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    const res = await axios.post("http://localhost:8080/auth/loginsk", {
      userName: name,
      password: password
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role",res.data.role);

     console.log("TOKEN:", res.data.token);
      console.log("ROLE:", res.data.role);

    if(res.data.role === "RoomOwner"){
      navigate("/dashboard");
    }
    else {
      navigate("/");
    }
    // alert("Login Success");

    // navigate("/"); // 👈 Home pe bhej do

  } catch (error) {
    console.log(error);
    alert("error");
  }
};
  return (
    <div className='flex justify-center items-center'>
        <div className='justify-center items-center p-10 display-flex mt-10 bg-green-200 w-[300px] rounded-md'>

            {/*  */}
            <h1 className='font-bold text-3xl text-blue-500'>Login Form</h1> <br />

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
            <div> <span className='font-bold text-xl text-gray-700 '>Enter Your password :-</span><br /> <br />
                 <input
                 type="text"
                  name="password" 
                  placeholder='Enter Your password'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className='border-1 rounded-md  w-[225px] pl-5'
                  />
            </div>

            <div className='flex justify-center items-center mt-5'> <button className='bg-blue-500 text-white w-[75px] rounded-sm' onClick={handleSubmit}>Submit</button></div>
            
        </div>
       
    </div>
  )
}

export default Signin