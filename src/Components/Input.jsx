import React, { useState } from 'react'
import axios from "axios";

function Input({ handleFileChange,photos }) {

  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [facility, setFacility] = useState("");
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
  e.preventDefault();
const token = localStorage.getItem("token"); 
  const formData = new FormData();

 formData.append("price", Number(price));
formData.append("contact",contact);
  formData.append("address", address);
  formData.append("facility", facility);
  formData.append("description", description);

  // images add karo
  photos.forEach((photo) => {
    formData.append("file", photo);
  });

  try {

    const response = await axios.post(
      "https://room-backend-1-k8iw.onrender.com/Roomowner/dashboard",
      formData,
      {
        headers: {
             Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log(response.data);

  } catch (error) {
    console.log(error);
  }
};

  return (
 <div className="flex flex-col gap-6 w-full max-w-md mx-auto mt-10 px-4">

    <form onSubmit={handleSubmit}>
        {/* price */}
        <div className="flex flex-col">
            <span className='font-bold text-xl text-gray-700'>
                Enter your price
            </span>
            <input 
                type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter your price"
            className='rounded-md border-4 border-gray-200 bg-gray-200 p-3 mt-2'
            />
        </div>

        {/* contact */}
        <div className="flex flex-col">
            <span className='font-bold text-xl text-gray-700'>
                Enter your contact number
            </span>
            <input
              type='Number'
              placeholder="Enter your contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className='rounded-md border-4 border-gray-200 bg-gray-200 p-3 mt-2'
            />
        </div>

        {/* address */}
        <div className="flex flex-col">
            <span className='font-bold text-xl text-gray-700'>
                Enter your address
            </span>
            <input
              type="text"
              placeholder="Address"
              value={address}
             onChange={(e) => setAddress(e.target.value)}
              className='rounded-md border-4 border-gray-200 bg-gray-200 p-3 mt-2'
            />
        </div>

        {/* facility */}
        <div className="flex flex-col">
            <span className='font-bold text-xl text-gray-700'>
                Enter your facility
            </span>
            <input
              type="text"
              placeholder="Facility"
              value={facility}
             onChange={(e) => setFacility(e.target.value)}
            className='rounded-md border-4 border-gray-200 bg-gray-200 p-3 mt-2'
            />
        </div>

        {/* description */}
        <div className="flex flex-col">
            <span className='font-bold text-xl text-gray-700'>
                Enter your description
            </span>
            <textarea
              placeholder="Enter description"
              value={description}
             onChange={(e) => setDescription(e.target.value)}
            className='rounded-md border-4 border-gray-200 bg-gray-200 p-3 mt-2'
            />
        </div>
        
  <button className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>

      </form>

    </div>
  )
}

export default Input