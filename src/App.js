import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Layout from './common/components/Layout';
import NewsList from './features/news-list/NewsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NewsList />} />
        <Route path="/search/:query" element={<NewsList />} />
      </Route>
      </Routes>
        {/* <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/> */}
    </BrowserRouter>
  );
}

export default App;
