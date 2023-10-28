import { Route, Routes } from 'react-router-dom';
import ShowTransactions from './pages/ShowTransactions';
import DateRangeTransaction from './pages/DateRangeTransaction';
import ShowBalance from './pages/ShowBalance';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={ShowTransactions} exact />
        <Route path="/daterange" Component={DateRangeTransaction} exact />
        <Route path="/balance" Component={ShowBalance} exact />
      </Routes>
    </div>
  );
}

export default App;
