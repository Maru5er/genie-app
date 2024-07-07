"use client";
import './globals.css'
import Navbar from './components/navbar';
import {Switch, Textarea} from '@headlessui/react';
import { useEffect, useState } from 'react';
import { ImageGallery } from 'react-image-grid-gallery';
import { RingLoader } from 'react-spinners';
import { Select, Label, Field, Description } from '@headlessui/react';



export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
  const [text, setText] = useState('');
  const [style, setStyle] = useState('Claymation');
  const [imageNumber, setImageNumber] = useState('3');
  const [audioFile, setAudioFile] = useState(null); 

  
  async function getImages() {
    if (text == '') {
      alert('Textarea is empty');
      return;
    }
    console.log(process.env.NEXT_PUBLIC_SERVER_HOST);
    setGenerated(true);
    setLoaded(false);
    try {
      var input = text;
      input += `Generate ${imageNumber} images in a ${style} art-style`;
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/stream`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({'story' : input})
      });
      
      const data = await res.json();
      setImagesArray(data['images']);
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoaded(true);
    }
  }

  const handleFileChange = (event) => {
    setAudioFile(null);
    const file = event.target.files[0];
    setAudioFile(file);
  }


  async function parseAudio() {
    if (!audioFile) {
      alert('Please select an audio file');
      return;
    }
    const formData = new FormData();

    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');
    formData.append('respond_format', 'json');
    console.log(formData);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/parseAudio`, {
        method: 'POST',
        body : formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send audio file');
      }

      const result = await response.json();
      console.log(result);
      if (result['text']) {
        setText(result['text']);
      } else {
        setText('Failed to parse audio');
      }
    } catch (error) {
      console.error('Error during fetch: ', error)
    } finally {
      setEnabled(false);
    }
  }


  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center text-center p-4 min-h-screen">
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
            <div className='h-32 w-full mb-40'>
              <label htmlFor="audioInput" className="block text-lg mt-4">Audio Input:</label>
              <input placeholder={audioFile ? audioFile.name : "No file chosen"} type="file" id="audioInput" accept="audio/*" className="mt-2 p-2 border border-gray-300 rounded" onChange={handleFileChange}/>
              {audioFile && (
                <div className='flex flex-col justify-center m-4 items-center w-full'>
                  <audio controls>
                  <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
                  Your browser doesn{`&apos`}t support this audio type
                  </audio>
                  <p className='m-2'>The transcribed audio will appear in the text-input box after it is parsed</p>
                </div>
              )}
            </div>
          ) : (
            <div className='h-32 w-full md:w-96 mb-40'>
              <label htmlFor="textInput" className="block text-lg mt-4">Text Input:</label>
              <textarea placeholder="Your story goes here..." value = {text} style={{resize:'none', width:'80vw', marginLeft:'10vw'}} id="textInput" rows="8" className="absolute left-0 mt-2 p-2 border-4 border-gray-300 rounded w-4/5 text-black bg-gray-200"
                        onChange={(e) => setText(e.target.value)}></textarea>
            </div>
          )}
        </div>
        <div className='flex flex-row justify-center w-100'>
        <Field>
            <Label>Select the style for the image</Label>
            <Select value={style} className='border-2 m-2 p-2 data-[hover]:shadow data-[focus]:bg-gray-500 text-gray-800 bg-gray-200' aria-label='Style'
                    onChange={(e) => setStyle(e.target.value)}>
              <option value='Claymation'>Claymation</option>
              <option value='Gothic'>Gothic</option>
              <option value='Storybook Illustration'>Storybook</option>
              <option value='Realistic'>Realistic</option>
              <option value='Digital paianting'>Digital art</option>
              <option value='Crayon drawing'>Crayon</option>
              <option value="Children's Drawing">Children Drawing</option>
            </Select>
          </Field>
          <button className='m-2 border-2 mh-4 border-gray-300 p-1 hover:bg-white hover:text-black w-40'
            onClick={enabled ? parseAudio : getImages}
          >
            {enabled ? "Parse " : "Generate"}
          </button>
          <Field>
            <Label>Number of images</Label>
            <Select value={imageNumber} className='border-2 m-2 p-2 data-[hover]:shadow data-[focus]:bg-gray-500 text-gray-800 bg-gray-200' aria-label='Style'
                    onChange={(e) => setImageNumber(e.target.value)}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Select>
          </Field>
          
          
        </div>
        
        
        <div className="flex justify-center items-center mt-10">
          {loaded ? (
              <ImageGallery 
              imagesInfoArray={imagesArray}
              columnCount={"auto"}
              columnWidth={230}
              size={"auto"}
              gapSize={24}
            />
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <h3 className={`${generated ? 'opacity-100' : 'opacity-0'} text-sm m-4`}>Generating your image. Image may take several minutes to generate...</h3>
              <RingLoader
                color='gray'
                loading={generated}
                aria-label="Loading Spinner"
                data-testid="loader"
                size={100}
              />
            </div>
          )}
          
        </div>
        
      </div>
    </div>
  );
}


