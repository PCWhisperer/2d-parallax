import * as React from 'react';
import './App.css';

import xhr from 'xhr';

import GlslCanvas from './GlslCanvas/GlslCanvas.js';

class App extends React.Component {

  private mCanvas: React.RefObject<HTMLCanvasElement>;
  private mTimerDiv: React.RefObject<HTMLDivElement>;

  constructor() {
    super({});
    this.mCanvas = React.createRef();
    this.mTimerDiv = React.createRef();
  }

  public render() {
    return (
      <div className="App">
        <canvas ref={this.mCanvas} width={600} height={600} />
        <div ref={this.mTimerDiv} />
      </div>
    );
  }

  public componentDidMount() {
    const loadTime: number = performance.now();
    const sandbox = new GlslCanvas(this.mCanvas.current);
    xhr.get("./media/mobile.glsl", (error, response, body) => {
      sandbox.load(body);
      sandbox.loadTexture("u_tex", "./media/base.png", { filtering: "nearest" });
      sandbox.loadTexture("u_texDP", "./media/DP.png", { filtering: "nearest" });
      sandbox.setUniform("u_startTime", -1.0);
    });

    setInterval(() => {
      // const date = new Date();
      // const startDate = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() * 0.001;

      const delta = (performance.now() - loadTime) / 1000;
      sandbox.setUniform("u_startTime", delta);
      if (this.mTimerDiv.current) {
        this.mTimerDiv.current.innerHTML = delta + "";
      }
    }, 1000);

  }


}

export default App;
