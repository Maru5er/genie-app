import './globals.css'
import Navbar from './components/navbar';

export default function Home() {
  return(
    <div>
      <Navbar />
      <div className="flex-column justify-center items-center h-screen text-center p-4">
        <h1 className="text-3xl md:text-5xl mb-4">Welcome to Genie! <n/> Make your story come to life</h1>
        <div>
          This is the input
        </div>
      </div>
    </div>
    
  );
}


