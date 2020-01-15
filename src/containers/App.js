import React from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import './App.css'
import ErrorBoundary from '../components/ErrorBoundary';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      robots:[],
      searchField:''
    }
  }

  onSearchChange = (event) => {
    this.setState({searchField:event.target.value})
    }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => {
      return response.json();
    }).then(users => {
      this.setState({robots:users})
    })
  }


  render() {
    const {robots, searchField} = this.state
    const filteredRobot = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobot}/>
          </ErrorBoundary>
        </Scroll>
      </div>
    );
}
}

export default App;