import * as React from 'react';
import './App.css';

import xhr from 'xhr';
import logo from './logo.svg';

class App extends React.Component {

  private GLSLCanvas = require('glslCanvas');
  private mCanvas: React.RefObject<HTMLCanvasElement>;

  constructor() {
    super({});
    this.mCanvas = React.createRef();
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <canvas ref={this.mCanvas} width={600} height={600} />
      </div>
    );
  }

  public componentDidMount() {
    const sandbox = new this.GLSLCanvas.default(this.mCanvas.current);
    xhr.get("./media/parallax.frag", (error, response, body) => {
      sandbox.load(body);
      sandbox.loadTexture("u_tex", "./media/base.png", { filtering: "nearest" });
      sandbox.loadTexture("u_texDP", "./media/DP.png", { filtering: "nearest" });
    });
  }


}

export default App;
