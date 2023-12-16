import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

function App() {
  const [videoId, setVideoId] = useState(''); // Replace with your unlisted video ID
  const [apiKey, setApiKey] = useState(''); // Replace with your YouTube Data API key
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Fetch video details using YouTube Data API
    axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
      .then(response => {
        const title = response.data.items[0].snippet.title;
        document.title = title; // Set the page title to the video title
      })
      .catch(error => console.error('Error fetching video details:', error));
  }, [videoId, apiKey]);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onStateChange = (event) => {
    // Handle player state changes if needed
  };

  return (
    <div className="App">
      <h1>YouTube Video Player</h1>
      <input
        type="text"
        placeholder="Enter YouTube Video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter YouTube API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      {videoId && apiKey && (
        <YouTube
          videoId={videoId}
          opts={{
            height: '390',
            width: '640',
            playerVars: {
              modestbranding: 1, // Hide YouTube logo
              controls: 1, // Show video controls
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      )}
    </div>
  );
}

export default App;

//api key:  AIzaSyDWRSaummuprjeEz0cb-cP2GQ3r5oHl9Ec