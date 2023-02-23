import React from "react";
import { Route, Routes } from "react-router-dom";

import RecordList from "./components/RecordList";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<RecordList />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
