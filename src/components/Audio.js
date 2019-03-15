import React, { Component } from 'react';
import Peaks from 'peaks.js';
import '../App.css';
import Song from '../chrismas.mp3';
import ReactDOM from 'react-dom';

export default class Audio extends Component {
    constructor(props) {
      super(props)
      this.load = this.load.bind(this);
      this.state = {
         
      }
    }
    

    load = () => {
        this.toLoad();
    }

    toLoad = () => {

        const extFile = 'dat';
        var _tmp
        const fileName = Song.substr(0, ~(_tmp = Song.lastIndexOf('.')) ? _tmp : Song.length) + `.${extFile}`;
        console.log(`${fileName}`);

        const myAudioContext = new AudioContext();
        this.$el = ReactDOM.findDOMNode(this);
        this.$peak = this.$el.querySelector('section');
        this.$peakMedia = this.$el.querySelector('audio');

        this.p = Peaks.init({
          container: this.$peak,
          mediaElement: this.$peakMedia,
          audioContext: myAudioContext,
          withCredentials: false,
          height: 200,
          zoomLevels: Array(8).fill().map((_, i) => 256 << i),
          keyboard: true,
          nudgeIncrement: 0.01,
          inMarkerColor: '#a0a0a0',
          outMarkerColor: '#a0a0a0',
          zoomWaveformColor: 'rgba(0, 225, 128, 1)',
          overviewWaveformColor: 'rgba(0,0,0,0.2)',
          overviewHighlightRectangleColor: 'grey',
          segmentColor: 'rgba(255, 161, 39, 1)',
          playheadColor: 'rgba(0, 0, 0, 1)',
          playheadTextColor: '#aaa',
          showPlayheadTime: true,
          pointMarkerColor: '#FF0000',
          axisGridlineColor: '#ccc',
          axisLabelColor: '#aaa',
          zoomAdapter: 'animated',
          logger: console.error.bind(console),
          editable: true,
        });

        this.p.player.setSource(Song);
        this.p.player.play();
    }

  render() {
    return (
      <div className="App">
        <div className="container text-center">
            <button onClick={this.load} className="btn btn-success btn-lg mt-5">LOAD</button>
            <h1>Cutting Media</h1>
            <section className=".peak">
                <audio controls>
                    <source src={Song} type="audio/mpeg" />
                    <source src={Song} type="audio/ogg" />
                </audio>
            </section>
        </div> 
      </div>
    )
  }
}



{/* <video className="mt-2" >
                    <track kind="captions" />
                    <source src={audioDomain + this.state.audio} type="video/mp4" />
                  </video> */}