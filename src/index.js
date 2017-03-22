import Lodash from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';

const API_KEY = "AIzaSyBTziXyw7A4BRcYAt16UVzK7DpB8GpzvBY";

// Create a Component

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos : [],
      selectedVideo:null
    };

    this.onVideoSelect = this.onVideoSelect.bind(this);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.onSearchTermChange();
  }

  onVideoSelect(video){
    this.setState({
      selectedVideo:video
    });
  }
  onSearchTermChange(term){
    YTSearch({ key : API_KEY , term : term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo : videos[0]
      });
    });
  }
  render(){
    const videoSearch = Lodash.debounce((term) => {this.onSearchTermChange(term)}, 500);
    return (
      <div>
        <SearchBar onTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList videos = {this.state.videos} onVideoSelect={this.onVideoSelect} />

      </div>
    );
  }
}

// Render it into the dOM

ReactDOM.render(<App />,document.querySelector('.container'));
