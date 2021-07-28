import { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        this.setState({ monsters: users });
      });
  }

  render() {
    let { monsters, searchField } = this.state;
    searchField = searchField.toLowerCase();
    if (searchField !== '') {
      monsters = monsters.filter((monster) =>
        monster.name.toLowerCase().includes(searchField),
      );
    }
    return (
      <div className='App'>
        <h1>Monsters</h1>
        <SearchBox
          placeholder='search monsters'
          onChange={(event) =>
            this.setState({ searchField: event.target.value })
          }
        />
        <CardList monsters={monsters}></CardList>
      </div>
    );
  }
}

export default App;
