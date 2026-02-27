import React, { useState, useRef } from 'react';
import axios from 'axios';

function VoiceBot() {
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log('SpeechRecognition API not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      recognition.stop();
      console.log(text)
      setTranscript(text);
      sendQuery(text);
    };
    recognition.start()
    
    recognitionRef.current = recognition;
  };

              const sendQuery = async (text) => {
              try {
                const res = await axios.post('https://bot-testing-4e9t.onrender.com/api/bot/query', { text });
                console.log("Response received:", res.data.answer);

                setReply(res.data.answer);

                console.log("Calling speak...");
                speak(res.data.answer);

              } catch (err) {
                console.error("Error in sendQuery:", err);
              }
            };
              const speak = (text) => {
  if (!text) return;

  const synth = window.speechSynthesis;

  const speakNow = () => {
    synth.cancel();

    const voices = synth.getVoices();
    console.log("Available voices:", voices);

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";

    if (voices.length > 0) {
      utter.voice = voices.find(v => v.lang === "en-US") || voices[0];
    }

    utter.onstart = () => console.log("Speech started");
    utter.onend = () => console.log("Speech ended");
    utter.onerror = (e) => console.log("Speech error:", e);

    synth.speak(utter);
  };

  
  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = speakNow;
  } else {
    speakNow();
  }
};
async function stopspeaking(){
  const synth = window.SpeechSynthesis;
  synth.cancel();
}

  return (
    <div>
      <h2>Voice Bot</h2>
      <button onClick={startListening}>Ask by voice</button>
      <button onClick={stopspeaking}>stop the voicebot</button>
      <p><strong>You said:</strong> {transcript}</p>
      <p><strong>Bot reply:</strong> {reply}</p>
      
    </div>
  );
}

export default VoiceBot;
