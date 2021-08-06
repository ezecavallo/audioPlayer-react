import React from 'react';
import '../assets/styles/components/Search.css';

class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <span className="search__icon"></span>
        <input className="search__input" type="text" placeholder="Search..." />
      </div>
    );
  };
};

export default Search;