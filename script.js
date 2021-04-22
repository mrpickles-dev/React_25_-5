



// main component

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionLength: 25,
        sessionBreak: 5,
        sessionDisplay:'Session',
        time: 1500
      };
    
  
      this.handleClick = this.handleClick.bind(this);
      this.handleIncrement = this.handleIncrement.bind(this);
      this.minSecConverter = this.minSecConverter.bind(this);

      }  
    

   
    handleClick(){
        const { time } = this.state;
        console.log(time)
if (time > 0){
    setInterval( this.handleIncrement() 
        , 1000);
} else
return console.log("Stopped")

/*     for (let i = time; i > 0; i--){
         setInterval( this.handleIncrement() 
        , 1000);
    }
/*  */
    }

 minSecConverter() {
        let minutes = Math.floor(this.state.time / 60);
        let seconds = this.state.time - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
      }




    handleIncrement() {
     /*    const [timeValue, spazio] = this.state.time;
        console.log(timeValue) */

/* for (let i = timeValue; i > 0; i++){

    setInterval(function(){ 
        console.log("è passato un se")
        
     }, 1000); */
return this.setState({ time: this.state.time -1})
}

     

        
    render() {
        const {time} = this.state;
        
      return (
        <div className="container">
            <h1>Timer 25 + 5</h1>
        <div className="numDisplay">
          {this.minSecConverter()}
        </div>
        <div className="play" href="#" onClick={this.handleClick}>
            <button>Play</button>
        </div>
        
        
        </div>
      );
    }
  }


  ReactDOM.render(<App/>, document.getElementById('app'))
