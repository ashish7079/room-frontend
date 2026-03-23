import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [data, setdata] = useState([]);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "RoomOwner") {
      fetchOwnerData();
      fetchMessages();
    } else {
      fetchData();
    }
  }, []);

  // USER → all rooms
  const fetchData = async () => {
    try {
      const res = await axios.get("https://room-backend-production-d344.up.railway.app/rooms");
      setdata(Array.isArray(res.data) ? res.data : []); // 🔥 FIX
    } catch (error) {
      console.log(error);
    }
  };

  // OWNER → own rooms
  const fetchOwnerData = async () => {
    try {
      const token = localStorage.getItem("token");

  const res = await axios.get(
  "https://room-backend-production-d344.up.railway.app/RoomOwner/mydata",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      setdata(Array.isArray(res.data) ? res.data : []); // 🔥 FIX

    } catch (error) {
      console.log(error);
    }
  };

  // OWNER → messages
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
  "https://room-backend-production-d344.up.railway.app/RoomOwner/messages",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      setMessages(Array.isArray(res.data) ? res.data : []); // 🔥 FIX

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
  `https://room-backend-production-d344.up.railway.app/RoomOwner/delete/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      setdata(prev => prev.filter(item => item.id !== id));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-400 min-h-screen p-5 flex justify-center">
      <div className="w-full max-w-5xl">

        {/* ROOMS */}
        {data.length === 0 ? (
          <p>No data</p>
        ) : (
          data.map((item, index) => (
            <div key={item.id || index}>

              <div
                className={`flex flex-col md:flex-row 
                ${index % 2 !== 0 ? "md:flex-row-reverse" : ""} 
                items-center gap-5 
                transition duration-300 hover:scale-105 hover:shadow-2xl`}
              >

                {/* Images */}
                <div className='mt-5 flex justify-center items-center md:w-1/2'>
                  <div className="flex gap-2 flex-wrap">
                    {item.upload?.split(",").map((img, i) => (
                      img && (
                        <div 
                          key={`${img}-${i}`}
                          className="w-[220px] h-[220px] bg-white shadow-md rounded-lg flex items-center justify-center"
                        >
                          <img
                            src={`https://room-backend-production-d344.up.railway.app/images/${img}`}
                            className="max-w-full max-h-full object-contain transition duration-300 hover:scale-110"
                          />
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className='text-center md:w-1/2'>

                  <div className='bg-green-300 mt-2'>
                    Price: {item.price}
                  </div>

                  <div className='bg-red-200'>
                    Contact: {item.contact}
                  </div>

                  <div className='bg-sky-300'>
                    Address: {item.address}
                  </div>

                  <div className='bg-blue-300'>
                    Facility: {item.facility}
                  </div>

                  <div className='bg-pink-300'>
                    Description: {item.description}
                  </div>

                  {/* USER → BUY */}
                  {role !== "RoomOwner" && (
                    <div className='flex justify-center mt-2'>
                      <div
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          if (!token) {
                            navigate("/register");
                          } else {
                            navigate(`/buy/${item.id}`);
                          }
                        }}
                        className='bg-yellow-400 w-[120px] text-center cursor-pointer 
                        transition duration-300 hover:bg-yellow-500 hover:scale-105'
                      >
                        Buy now
                      </div>
                    </div>
                  )}

                  {/* OWNER → DELETE */}
                  {role === "RoomOwner" && (
                    <div className="flex justify-center mt-2">
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure?")) {
                            handleDelete(item.id);
                          }
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded 
                        transition duration-300 hover:bg-red-600 hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>
          ))
        )}

        {/* OWNER → MESSAGES */}
        {role === "RoomOwner" && (
          <>
            <h1 className="text-2xl font-bold mt-10">User Messages</h1>

            {messages.length === 0 ? (
              <p>No messages</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-gray-200 p-4 mt-3 rounded">

                  <p><b>User:</b> {msg.userName}</p>
                  <p><b>Message:</b> {msg.description}</p>

                  {/* 🔥 SAFE FIX */}
                  <p><b>Room:</b> {msg.upload?.address || "No Address"}</p>

                </div>
              ))
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default Home;