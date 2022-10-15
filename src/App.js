import React from 'react'
import './App.css';
import List from "./listPage"
import Login from "./Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/listView" element={<List />}> </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
