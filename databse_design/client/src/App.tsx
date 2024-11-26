import { useCallback, useState } from 'react'
import SearchBar from './components/SearchBar'
import QueryResults from './components/QueryResults';

import { getData } from './utils/api';
import type { Material } from './utils/api';

import './App.css'

function App() {

  const [queryResults, setQueryResults] = useState<Material[]>([]);

  const searchHandler = useCallback( async(searchVal: string) => {
    // Call the API handler with query parameter
    const queryData = await getData(searchVal);
    setQueryResults(queryData)

  }, []);

  return (
    <>
      <h1>Materials Dataset</h1>
      <SearchBar searchCallback={searchHandler} />
      <QueryResults data={queryResults}/>
    </>

  )
}

export default App
