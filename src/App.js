import React, {useState, useEffect} from 'react';

const DrumPad = (props) => {

  let letter = props.letter;
    return(<button class="drum-pad" onMouseDown = {event => props.playDrum(letter)} id={props.sound.split("/").pop().split(".").shift()}>
      <audio src = {props.sound} class="clip" id={props.letter.toUpperCase()}></audio>
        {letter.toUpperCase()}
      </button>);
    
}

function DrumBox() {
  
  const [trigger, setTrigger] = useState('');
  const [volume, setVolume] = useState(20);
  
  const soundSet = [
                    ['q', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'],
                    ['w', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'],
                    ['e', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'],
                    ['a', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'],
                    ['s', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'],
                    ['d', 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'],
                    ['z', 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'],
                    ['x', 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'],
                    ['c', 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3']
                  ];
    
  useEffect(() => {
    window.addEventListener('keydown', keyPressHandler);
      // cleanup this component
    return () => {
        window.removeEventListener('keydown', keyPressHandler);
      };
  },[]);
  
  useEffect(() => {
    window.addEventListener('keyup', keyShiftHandler);
      // cleanup this component
      return () => {
        window.removeEventListener('keyup', keyShiftHandler);
      };
  },[]);
  
  const keyPressHandler = (e) => {
      //console.log(e.key);
      for(let i=0; i < soundSet.length; i++){
        if(soundSet[i][0] === e.key.toLowerCase()){
          
          playDrum(e.key);
        }
      }
    }
  const keyShiftHandler = (e) => {
    
  }
  
   const playDrum = (letter) => {
      //let snd = new Audio(props.sound); removed because of FCC 
     console.log('playdrum called' + letter);
     
     let snd = document.getElementById(letter.toUpperCase());
     
     snd.volume = (volume/100);
     snd.play();
     console.log(snd.src)
     setTrigger(snd.src.split("/").pop().split(".").shift());
    } 
  
   const changeVolume = (e) => {
     
     setVolume(e.target.value);
     setTrigger(`Volume:${e.target.value}`);
   }
   
  return(
    <div id="drum-machine">
      <div id="drum-pads">
        {soundSet.map(elem => <DrumPad letter = {elem[0]} sound = {elem[1]} playDrum={playDrum} />)}
      </div>
      <div id="control-panel">
        <p id = "display">{trigger}</p>
        <div class="slider">
          <input type="range" id="vol" min="0" max="100" value={volume} onChange={changeVolume}></input>
        </div> 
      </div>
    </div>
  )
}

export default DrumBox;
