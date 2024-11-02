"use client"
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function page() {
   
    const [date, setDate] = useState<Date | null >(null);
    const [email, setEmail] = useState<string>();
    const [firstname, setFirstname] = useState<string>();
    const [lastname, setlastName] = useState<string>();
    const [username, setUsername] = useState<string>();

    const handleSubmit = async () => {
        console.log("here");
        await fetch(`/api/user/${email}`, {
            method: "POST",
            body: JSON.stringify({
                date , firstname , lastname , username , email 
            })
        })

        console.log(date, firstname, lastname, username , email);
    }


  return (
      <section className="bg-white">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
              <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                  <img
                      alt=""
                      src={"/lib.jpeg"}
                  />

                  
              </section>

              <main
                  className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
              >
                  <div className="max-w-xl lg:max-w-3xl">
                  

                      <div onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                  First Name
                              </label>

                              <input
                                  type="text"
                                  id="FirstName"
                                  name="first_name"
                                  onChange={(e)=>setFirstname(e.target.value)}
                                  className="mt-1 outline-none w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                              />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="LastName" className=" outline-none block text-sm font-medium text-gray-700">
                                  Last Name
                              </label>

                              <input
                                  type="text"
                                  id="LastName"
                                  onChange={(e)=>setlastName(e.target.value)}
                                  name="last_name"
                                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                              />
                          </div>

                          <div className="col-span-6">
                              <label  className="block text-sm font-medium text-gray-700 outline-none "> username </label>

                              <input
                                  type="text"
                                  id="username"
                                  name="username"
                                  onChange={(e)=>setUsername(e.target.value)}
                                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm outline-none "
                              />
                          </div>
                          <div className="col-span-6">
                              <label className="block text-sm font-medium text-gray-700"> Email </label>
                              <input
                                  type="text"
                                  id="username"
                                  name="username"
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm outline-none "
                              />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> date Of birth </label>
                              <DatePicker className=''  selected={date} onChange={(dat) => setDate(dat)} />
                          </div>

                    

                          <div className="col-span-6">
                              <p className="text-sm text-gray-500">
                                  By creating an account, you agree to our
                                  <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                  and
                                  <a href="#" className="text-gray-700 underline">privacy policy</a>.
                              </p>
                          </div>

                          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                              <button
                                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                  onClick={handleSubmit}
                              >
                                  Create an account
                              </button>

                              
                          </div>
                      </div>
                  </div>
              </main>
          </div>
      </section>
  )
}

export default page
