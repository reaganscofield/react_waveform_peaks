import React, { Component } from 'react';
import Peaks from 'peaks.js';
import moment from 'moment';
import ToggleDisplay from 'react-toggle-display';
import '../App.css';
import Song from '../chrismas.mp3';
import ReactDOM from 'react-dom';

export default class Audio extends Component {
    constructor(props) {
      super(props)

      this.load = this.load.bind(this);
      this.play = this.play.bind(this);
      this.pause = this.pause.bind(this);
      this.zoomIn = this.zoomIn.bind(this);
      this.zoomOut = this.zoomOut.bind(this);
      this.addSegment = this.addSegment.bind(this);
      this.showSegment = this.showSegment.bind(this);
      this.playCutted = this.playCutted.bind(this);
      this.removeCutted = this.removeCutted.bind(this);
      this.downloadCutted = this.downloadCutted.bind(this);

      this.state = {
         toggle: false,
         cuttedSegments: [],
         show: false,
      }

    }
    

    load = () => {
        this.toLoad();
    }

    play = () => {
        this.p.player.play();
    }

    pause = () => {
      this.p.player.pause();
    }

    zoomIn = () => {
      this.p.zoom.zoomIn();
    }

    zoomOut = () => {
      this.p.zoom.zoomOut();
    }

    addSegment = () => {
      this.p.segments.add({
        startTime: this.p.player.getCurrentTime(),
        endTime: this.p.player.getCurrentTime() + 10,
        duration: (this.p.player.getCurrentTime() + 10) - this.p.player.getCurrentTime(),
        editable: true,
        labelText: sessionStorage.getItem('mediaId'),
      });
    }

    showSegment = () => {
      const cuttedSegments = this.p.segments.getSegments();
      this.setState({ cuttedSegments, show: !this.state.show });
    }

    playCutted = (id) => {
      const playSegments = this.p.segments.getSegment(id);
      console.log(" instance player : ", playSegments);
      this.p.player.playSegment(playSegments);
    }

    removeCutted = (id) => {
      this.p.segments.removeById(id);
      this.setState({
        cuttedSegments: this.state.cuttedSegments,
      });
    }

    downloadCutted = (id) => {
      console.log(id);
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
        //this.p.player.setSource(Song);
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
                    <button onClick={this.pause} className="btn btn-success mr-2">Pause</button>
                    <button onClick={this.addSegment} className="btn btn-success mr-2">Add Time</button>
                    <button onClick={this.showSegment} className="btn btn-success mr-2">Show Cutted</button>
                    <button onClick={this.zoomIn} className="btn btn-success mr-2">Zoom In</button>
                    <button onClick={this.zoomOut} className="btn btn-success mr-2">Zoom Out</button>
                </div>


              <div className="mt-5  text-light">
                <ToggleDisplay show={this.state.show}>
                  <div className="table-responsive text-light">
                    <table className="table text-light">
                      <thead>
                        <tr>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Total Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.cuttedSegments.map(keys => (
                          <tr key={keys.id}>
                            <td>
                              {moment.unix(keys.startTime).utc().format('HH:mm:ss')}
                            </td>
                            <td>
                              {moment
                                .unix(keys.endTime)
                                .utc()
                                .format('HH:mm:ss')}
                            </td>
                            <td>
                              {moment
                                .unix(keys.endTime - keys.startTime)
                                .utc()
                                .format('HH:mm:ss')}
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => this.playCutted(keys.id)}
                              >
                                Play Cutted
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => this.removeCutted(keys.id)}
                              >
                                Remove Cutted
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => this.downloadCutted(keys)}
                              >
                                Download Cutted
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-lg-2" />
                  </div>
                </ToggleDisplay> 
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