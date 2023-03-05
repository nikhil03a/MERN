import List from "./components/List";
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1> To do list</h1>
      <Routes>
        <Route exact path='/' element={<List />} />
      </Routes>
    </div>

  );
}

export default App;
