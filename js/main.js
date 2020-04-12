//Init SpeechSynth API
const synth = window. speechSynthesis;

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Init voices array
let voices = [];

function getVoices(){
    voices = synth.getVoices();
    //Loop through voices and create an option for each one
    voices.forEach(voice => {
    //Create option Element
    const option = document.createElement('option');
    //Fill the option with Voice and Language
    option.textContent = voice.name + '(' + voice.lang + ')';

    //Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
    });
};
getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak

function speak (){
    //Add Animated Background
    body.style.background = '#141414 url(../img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100%';

     //Check if Speaking
     if(synth.speaking){
         console.error('Already speaking...');
         return;
     }
     if(textInput.value !== ''){
      //Get speak text
      const speakText = new SpeechSynthesisUtterance(textInput.value);

      //Speak End
      speakText.onend = e => {
          console.log('Done speaking...');
          body.style.background = '#141414';
      }

      //Speak Error
      speakText.onerror = e => {
          console.error('something went wrong');
      }

      //Selected Voice
      const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

      //Loop through voices
      voices.forEach(voice => {
          if(voice.name === selectedVoice){
              speakText.voice = voice;
          }
      });
     

     //Set Pitch and rate
    speakText.rate = rate.value;
    speakText.pitch =pitch.value;
    //Speak
    synth.speak(speakText);
}
};
 


 //Text form submit
 textForm.addEventListener('submit', e => {
     e.preventDefault();
     speak();
     textInput.blur();
 });
 //Rate Value Change
 rate.addEventListener('change', e => rateValue.textContent = rate.value)

 //Pitch Value Change
 pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)

 //Voice select Change
 voiceSelect.addEventListener('change', e => speak());









