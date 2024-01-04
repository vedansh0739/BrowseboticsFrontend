import { useEffect,useRef,useState} from 'react';
import './App.css'

const Base = () => {
    const hasRun=useRef(false)
    const [screenshot, setScreenshot] = useState('');
    const [audioData, setAudioData]=useState('');
    const [text, setText] = useState('');
    const [isInitiated, setIsInitiated] = useState(false); // New state to track if initiation was successful
    const [responseText, setResponseText] = useState('');

    const handleClick = async () => {
      try {
          // Replace with the actual request you want to send
          const response=await fetch('https://127.0.0.1:8000/stream/goback/', { //||||DEV2PROD||||

          method: 'GET',
        
          credentials: 'include', 
        });
        const data = await response.json();
        // Check if the request was successful
        if (response.ok) {
          // Replace with the URL to redirect to
        setScreenshot(data.screenshot);

        } else {
          alert('Failed to submit form');
        }


      } catch (error) {
          console.error('Request failed:', error);
      }
  };
    const handleSubmit = async() => {
    try {
        // Replace with your backend API URL and configuration
        const response = await fetch('https://127.0.0.1:8000/stream/initiator/', { //||||DEV2PROD||||

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value:'initiate' }),
          credentials: 'include', 
        });

        const data = await response.json();
        // Check if the request was successful
        if (response.ok) {
          // Replace with the URL to redirect to
        setScreenshot(data.screenshot);
        // setAudioData(data.audio);
        setIsInitiated(true);
        } else {
          alert('Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form', error);
        alert('Error submitting form');
      }

  };
  const handleTextSubmit = async () => {
    try {
      const response = await fetch('https://127.0.0.1:8000/stream/process/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "cmd":text }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        // Handle the response from the /stream/process endpoint

        setScreenshot(data.screenshot);
      
      } else {
        alert('Failed to process text');
      }
    } catch (error) {
      console.error('Error submitting text', error);
      alert('Error submitting text');
    }
  };


  useEffect(() => {
    if (!hasRun.current) {
      handleSubmit();
      hasRun.current = true;
    }
  }, []);
 
  return (
      <div className='out'>
        {isInitiated && (
        <div>
          {responseText && <p>Response: {responseText}</p>}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
          />
          <button onClick={handleTextSubmit}>Submit Text</button>
          <button onClick={handleClick}>
            Go Back
        </button>
        </div>
      )}
      <label htmlFor="workflowInput" className="input-label">
        Name: SpeakSurf
        <br />
        Tagline: "Voice-Powered Web Journeys for the Visually Impaired"



        <br></br>
      </label>
      {screenshot && <img className="dope" src={`data:image/png;base64,${screenshot}`} alt="Screenshot" />}
      {/* {audioData && <audio src={`data:audio/mpeg;base64,${audioData}`} controls autoPlay />} */}

      {!isInitiated && (<p>Launching Browser Instance</p>)}
      
    </div>

  );
};

export default Base;





