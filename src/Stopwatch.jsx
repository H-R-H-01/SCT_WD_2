import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]); 
  const intervalRef = useRef(null); 

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10); 
    }
  };

  const pauseStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(time / 1000) % 60;
    const getSeconds = `0${seconds}`.slice(-2);
    const minutes = Math.floor(time / 60000);
    const getMinutes = `0${minutes}`.slice(-2);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

      <h1 className="text-5xl mb-5 tracking-wider">Task 2</h1>
      <h1 className="text-5xl mb-8">Stopwatch</h1>

      <div className="text-6xl mb-8">
        {formatTime(time)}
      </div>

      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-green-500 rounded shadow hover:bg-green-600"
          onClick={startStopwatch}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-yellow-400 rounded shadow hover:bg-yellow-500"
          onClick={pauseStopwatch}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-red-600 rounded shadow hover:bg-red-700"
          onClick={resetStopwatch}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 bg-pink-600 rounded shadow hover:bg-pink-700"
          onClick={addLap}
          disabled={!isRunning}
        >
          Lap
        </button>
      </div>

      <div className="mt-8 w-64 text-left">
        {laps.map((lap, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">Lap {index + 1}: </span>
            {formatTime(lap)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
