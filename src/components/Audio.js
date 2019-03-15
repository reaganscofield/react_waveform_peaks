import React, { Component } from 'react';
import Peaks from 'peaks.js';
import ToggleDisplay from 'react-toggle-display';
import '../App.css';
import Song from '../chrismas.mp3';
import ReactDOM from 'react-dom';

export default class Audio extends Component {
    constructor(props) {
      super(props)
      this.load = this.load.bind(this);
      this.play = this.play.bind(this);
      this.state = {
         toggle: false
      }
    }
    

    load = () => {
        this.toLoad();
    }

    play = () => {
        this.p.player.play();
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
          zoomWaveformColor: '#C02639',
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
    }

  render() {
    return (
      <div className="App">
        <nav class="nav nav-pills bg-danger navW_H flex-column flex-sm-row">
        </nav>
        <div className="container text-center">
            <h1 className="text-light pt-3">Short Audios & Video</h1>
            <div className="row">
               <div className="col-lg-2" />
               <div className="col-lg-8">
                 <button onClick={this.load} className="btn btn-danger  btn-block mt-3 mb-5">LOAD</button>
               </div>
               <div className="col-lg-2" />
            </div>
            
            <div className="">
                <section className=".peak bordering">
                    <audio>
                        <source src={Song} type="audio/mpeg" />
                        <source src={Song} type="audio/ogg" />
                    </audio>
                </section>
                <div className="mt-2">
                    <button onClick={this.play} className="btn btn-success mr-2">Play</button>
                    <button className="btn btn-success mr-2">Pause</button>
                    <button className="btn btn-success mr-2">Cut</button>
                    <button className="btn btn-success mr-2">Play</button>
                </div>
            </div>
        </div> 
      </div>
    )
  }
}



{/* <video className="mt-2" >
                    <track kind="captions" />
                    <source src={audioDomain + this.state.audio} type="video/mp4" />
                  </video> */}