import React from 'react';


class SearchBar extends React.Component {

constructor(props){
    super(props);
    this.searchLocation = this.searchLocation.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

searchLocation(e){
        let a = document.getElementById("Location").value
            this.props.seachValue(a);
      }

keyPress(e){
  if(e.key === 'Enter'){
    this.searchLocation();
  }
}

render(){
    return (
            <div>
              <h2>Location Name</h2><input type = 'text' placeholder = 'Enter a location' id = 'Location' onKeyPress = {this.keyPress}/>
              <button onClick = {this.searchLocation}>Search</button>
            </div>)
        }
}

export default SearchBar;
