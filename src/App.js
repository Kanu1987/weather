import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import {Container,Row} from 'reactstrap';

let apiKey = '2d79127a98104effaad222921180801'
let url ='http://api.apixu.com/v1/forecast.json?key='
let days= 3
let a = 10456;
let b = 10456;

class App extends Component {

  constructor(props){
    super(props);
      this.state = {
                    initialSearch: '',
                    searchedLocation:'',
                    weatherInfo: [],
                    cityInfo: {}
                  }
    this.updateSearch = this.updateSearch.bind(this);
    this.getdata = this.getData.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.renderCity = this.renderCity.bind(this);

    }


 async getData(a){
    try{
          let response = await fetch(url+apiKey+'&q='+a+'&days='+days)
            if(response.ok){
                  let jsonResponse = await response.json();
                    console.log(jsonResponse)
                  let days = jsonResponse.forecast.forecastday;
                  let info = jsonResponse.location
                  this.setState({weatherInfo:days,
                                  cityInfo: info});
                }
        }
  catch(error){console.log(error);}
  }

updateSearch(value){
    this.setState({searchedLocation: value})
    this.getData(value)
    }



renderInfo(){
  {

  let a = this.state.weatherInfo.map((day,i)=>{
    return (
          <Container key={i}>
              <Row>{day.date}</Row>
                <Row>{day.day.condition.text}</Row>
                <Row><img src ={day.day.condition.icon} alt = {day.day.condition.text}></img></Row>
                <Row>Min Temp: {day.day.mintemp_c}</Row>
                <Row>Max temp: {day.day.maxtemp_c}</Row>
              </Container>
          )
  })
  return a
  console.log(a);}
}

renderCity(){
  return(
    <div>
    <h4>{this.state.cityInfo.name}</h4>
    <h4>{this.state.cityInfo.country}</h4>
    <h6>{this.state.cityInfo.localtime}</h6>
    </div>
  )
}


render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weather</h1>
        </header>
        <SearchBar seachValue = {this.updateSearch}/>

        <div className ="Display">
          {this.renderCity()}
          {this.renderInfo()}</div>
      </div>
    );
  }
}

export default App;
