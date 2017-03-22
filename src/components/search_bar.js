import React,{Component} from 'react';

class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = {term:''};

    this.onInputChange = this.onInputChange.bind(this);
  }
  render(){
    return (
      <div>
        <input onChange={(event) => this.onInputChange(event.target.value)} value={this.state.term}/>
      </div>
    );
  }
  onInputChange(term){
    this.setState({
      term : term
    });
    this.props.onTermChange(this.state.term);
  }
}

export default SearchBar;
