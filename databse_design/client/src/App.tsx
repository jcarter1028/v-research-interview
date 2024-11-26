import { useCallback, useState } from 'react'
import SearchBar from './components/SearchBar'

import { getData } from './utils/api';
import type { Material } from './utils/api';

import './App.css'

function App() {

  const [queryResults, setQueryResults] = useState<Material[]>([]);

  const searchHandler = useCallback((searchVal: string) => {
    // Call the API handler with query parameter
    console.log("Search handler?", searchVal)
    const queryData = getData(searchVal);
    setQueryResults(queryData)

  }, []);

  return (
    <>
      <h1>Materials Dataset</h1>
      <SearchBar searchCallback={searchHandler} />
    </>
  )
}

export default App
