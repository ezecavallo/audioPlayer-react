import React from 'react';
import Header from '../components/Header';

const Layout = (props) => {
  const { user } = props
  return (
    <React.Fragment>
      <Header 
        user={user}
      />
      {props.children}
    </React.Fragment>
  )
}

export default Layout;