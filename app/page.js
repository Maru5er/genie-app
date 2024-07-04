"use client";
import './globals.css'
import Navbar from './components/navbar';
import {Switch, Textarea} from '@headlessui/react';
import { useState } from 'react';


export default function Home() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <h1 className="text-3xl md:text-5xl border-b-50 pb-4 mb-8">Welcome to Genie! <br /> Make your story come to life</h1>
        <div className="flex items-center space-x-4">
            <div className="relative inline-block w-40 h-10">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`bg-gray-900
                  relative inline-flex items-center h-10 w-40 rounded-md transition-colors duration-300 ease-in-out focus:outline-none`}
              >
                
                <div className='flex flex-row justify-center items-center'>
                  <p className={`${enabled ? 'text-gray-100' : 'text-black'}
                                p-5 pl-7 z-10`}>Text</p>
                  <p className={`${enabled ? 'text-black' : 'text-gray-100'}
                                p-5 pl-5 z-10`}>Audio</p>
                </div>
              </Switch>
              <div
                  className={`${enabled ? 'translate-x-20' : 'translate-x-1'}
                    absolute left-2 top-1/2 transform -translate-y-1/2 w-16 h-8 bg-gray-300 rounded-md transition-transform duration-300 ease-in-out`}
                />
            </div>
        </div>

        <div className="transition-opacity duration-300 ease-in-out">
          {enabled ? (
            <div className='h-32 w-full'>
              <label htmlFor="audioInput" className="block text-lg mt-4">Audio Input:</label>
              <input type="file" id="audioInput" accept="audio/*" className="mt-2 p-2 border border-gray-300 rounded"/>
            </div>
          ) : (
            <div className='h-32 w-full md:w-96'>
              <label htmlFor="textInput" className="block text-lg mt-4">Text Input:</label>
              <textarea style={{resize:'none', width:'80vw', marginLeft:'10vw'}}id="textInput" rows="8" className="absolute left-0 mt-2 p-2 border-4 border-gray-300 rounded w-4/5 text-black"></textarea>
            </div>
          )}
        </div>
        <button className='mt-40 border-2 border-gray-300 p-2 hover:bg-white hover:text-black'>
          Generate
        </button>
      </div>
    </div>
  );
}


