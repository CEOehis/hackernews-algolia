import React, { Component } from 'react';
import './App.css';

import Button from './components/Button';
import Search from './components/Search';
import Table from './components/Table';

const DEFAULT_QUERY = 'React';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE= 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      result: null
    }
  }

  onDismiss(id) {
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id );
    this.setState({
      result: {...this.state.result, ...{hits: updatedHits}}
    });
  }

  onSearchChange(e) {
    const searchTerm = e.target.value;
    this.setState({searchTerm: searchTerm});
  }

  onSearchSubmit(e) {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
    e.preventDefault();
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    // fetch from api using searchterm
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(res => res.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  setSearchTopStories(result) {
    const {hits, page} = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [...oldHits, ...hits]
    this.setState({
      result: {hits: updatedHits, page}
    });
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
  render() {
    const {searchTerm, result} = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            onChange={this.onSearchChange}
            value={searchTerm}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result
         ? <Table 
            list={result.hits}
            onDismiss={this.onDismiss}
          />
         : null
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
