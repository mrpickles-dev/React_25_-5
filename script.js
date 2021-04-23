
// main component

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionLength: 25,
        sessionBreak: 5,
        sessionDisplay:'Session',
        paused: true,
        time: 1500,
        active: undefined
      };
    
    }  
     
    // Convert time 

 minSecConverter() {
        let minutes = Math.floor(this.state.time / 60);
        let seconds = this.state.time - minutes * 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return minutes + ':' + seconds;
      }

// Reset the timer

      resetTime = () => {
        const audio = document.getElementById("beep");
        audio.pause();
        audio.currentTime = 0;
        clearInterval(this.active);
        this.setState({ 
          time: 1500, 
          sessionDisplay: 'Session', 
          paused: true, 
          sessionBreak: 5, 
          sessionLength: 25 
        });
    }
    
// Play and Pause function

    startPause = () => {
      const { active, paused, sessionDisplay } = this.state;
      const audio = document.getElementById("beep");
      
      if(paused === false){
          clearInterval(this.active);
          this.setState({ paused: true })
      } else
            {
             this.setState({ 
               paused : false
               });
             this.active = setInterval(() => {
                             const { time, sessionDisplay, sessionBreak, sessionLength } = this.state
                               
                             if(time <= 6){
                                document.getElementById("time-left").style.color = "red";
                             }
                             if(time === 0){
                                sessionDisplay === 'Session' ? this.setState({ sessionDisplay : 'Break', time : sessionBreak * 60 }) : this.setState({ sessionDisplay : 'Session', time : sessionLength * 60 });
                             
                                audio.play();
                             } else {
                                    this.setState({ time : time - 1 })
                             }
                                           }, 1000);
            }
    }

// Increment or Decrement session length

      lengthControl = e => {
        let { paused, sessionDisplay, sessionBreak, sessionLength, time } = this.state;
        
        let targeted = e.target.id.replace('-decrement', '').replace('-increment','');
        
        if(paused){
            switch(e.target.id){
              case 'break-decrement' :
                 sessionBreak > 1 ? 
                 sessionBreak = sessionBreak - 1 :
                 sessionBreak = sessionBreak; 
                 break;
              case 'break-increment' :
                 sessionBreak <= 59 ?
                  sessionBreak = sessionBreak + 1 :
                   sessionBreak = sessionBreak; 
                   break;
              case 'session-decrement' :
                 sessionLength > 1 ?
                  sessionLength = sessionLength - 1 :
                   sessionLength = sessionLength;
                   break;
              case 'session-increment' :
                sessionLength <= 59 ?
                 sessionLength = sessionLength + 1 :
                  sessionLength = sessionLength;
                   break;
            }
        
            if(sessionDisplay.toLowerCase() === targeted){
                if(targeted === 'session'){
                   time = sessionLength * 60;
                } else {
                     time = sessionBreak * 60;
                }
            }
            
            this.setState ({
                  sessionBreak: sessionBreak,
                  sessionLength: sessionLength,
                  time: time
            });
        }
      }
        
    render() {
      const { sessionBreak, sessionLength, time, paused, sessionDisplay  } = this.state;        
        
      return (
        <div className="container">
            <h1>Timer 25 + 5</h1>
            <div className="painel">
                <ControlLength myId="break-label" myText="Break Length" 
                buttonPlus="break-increment" buttonMinus="break-decrement" 
                myTag="break-length" myCount={sessionBreak} myFunction={this.lengthControl} />
                <ControlLength myId="session-label" myText="Session Length"
                 buttonPlus="session-increment" buttonMinus="session-decrement" 
                 myTag="session-length" myCount={sessionLength} myFunction={this.lengthControl} />
                </div>
                <audio id="beep" preload="auto" 
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
               <div id="painel2" className="painel2">
                 <div  id="timer-label" className="timer-label">{sessionDisplay}</div>
        <div id="time-left" className="time-left">{this.minSecConverter(time)}</div>
     
        <div className="buttons control">
                       <div id="start_stop"  className={ paused ? "fas fa-play btns" : "fas fa-pause btns" } onClick={this.startPause} />
                       <div id="reset" className="fas fa-redo btns"  onClick={this.resetTime} />
                    </div>  
        
        </div>
        </div>
      );
    }
  }

  // Controller for session length

  const ControlLength = (props) => {
    return (
          <div className="indicator">
              <h3 id={props.myId}>{props.myText}</h3>
              <div className="buttons">
                <div id={props.buttonMinus} onClick={props.myFunction}  className="fas fa-arrow-down" />
                <p id={props.myTag}>{props.myCount}</p>
                <div id={props.buttonPlus} onClick={props.myFunction} className="fas fa-arrow-up" />
              </div>
          </div>
          )
  }



  ReactDOM.render(<App/>, document.getElementById('app'))
