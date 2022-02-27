import React, {useEffect, useState} from 'react';

function App() {
    const [time, setTime] = useState(0)
    const [timerOn, setTimerOn] = useState(false);
    const [text, setText] = useState([]);

    useEffect(() => {
        let interval = null;

        if(timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)

    }, [timerOn])

    let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    let seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    let mseconds = ("0" + ((time / 10) % 100)).slice(-2);

    const loop = () => {
        let timeTextLoop = {
            m: minutes,
            s: seconds,
            ms: mseconds
        };
        setText([...text, timeTextLoop])
    }

    return (
        <div className="app">
            <div className="app-wrap">
                <div className="timer">
                    <span className="timer__item">{minutes}</span>:
                    <span className="timer__item">{seconds}</span>:
                    <span className="timer__item">{mseconds}</span>
                </div>
                <div>
                    {!timerOn && time === 0 && (
                        <button className="timer__button" onClick={() => setTimerOn(true)}>Start</button>
                    )}
                    {timerOn && (
                        <button className="timer__button" onClick={() => setTimerOn(false)}>Stop</button>
                    )}
                    {timerOn && (
                        <button className="timer__button" onClick={loop}>Loop</button>
                    )}
                    {!timerOn && time !== 0 && (
                        <button className="timer__button" onClick={() => setTimerOn(true)}>Resume</button>
                    )}
                    {!timerOn && time > 0 && (
                        <button className="timer__button" onClick={() => {setTime(0); setText([])}}>Reset</button>
                    )}
                </div>
            </div>
                <div>
                    {text.length !== 0
                        ? text.map((item, index) =>
                            <div className="loop__item" key={index}>{index + 1}. {item.m}:{item.s}:{item.ms}</div>
                        )
                        : ''
                    }
                </div>
        </div>
    );
}

export default App;
