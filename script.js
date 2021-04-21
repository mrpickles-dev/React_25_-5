

// First build a simple timer whit play and stop button

// main component

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {time: "25"};
      this.listRef = React.createRef();
    }

    playTimer = props => {
        return alert()
    }


        
    render() {
        const {time} = this.state;
      return (
        <div class="container">
            <h1>Timer 25 + 5</h1>
        <div className="numDisplay">
          {time}
        </div>
        <div className="play" onClick={playTimer()}>
            <button>Play</button>
        </div>
        
        
        </div>
      );
    }
  }


  ReactDOM.render(<App/>, document.getElementById('app'))
