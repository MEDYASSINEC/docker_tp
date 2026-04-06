import { useEffect } from 'react';
import './App.css';
import LivresTable from './component/LivresTable';
import { getBooks } from './store/booksSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(()=> {
    getBooks(dispatch);
  }, [])

  return (
    <div className="App">
      <LivresTable />
    </div>
  );
}

export default App;
