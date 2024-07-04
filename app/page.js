"use client";
import './globals.css'
import Navbar from './components/navbar';
import {Switch} from '@headlessui/react';
import { useState } from 'react';

export default function Home() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <h1 className="text-3xl md:text-5xl mb-4">Welcome to Genie! <br /> Make your story come to life</h1>
        <Switch.Group>
          <div className="flex items-center space-x-4">
            <Switch.Label className="text-lg">Audio</Switch.Label>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'}
                relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
            >
              <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'}
                  inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
            <Switch.Label className="text-lg">Text</Switch.Label>
          </div>
        </Switch.Group>

        <div className="mt-4">
          {enabled ? (
            <div>
              <label htmlFor="audioInput" className="block text-lg">Audio Input:</label>
              <input type="file" id="audioInput" accept="audio/*" className="mt-2 p-2 border border-gray-300 rounded"/>
            </div>
          ) : (
            <div>
              <label htmlFor="textInput" className="block text-lg">Text Input:</label>
              <textarea id="textInput" rows="4" className="mt-2 p-2 border border-gray-300 rounded w-full"></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


