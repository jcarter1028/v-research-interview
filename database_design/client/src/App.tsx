import { useCallback, useState } from 'react'
import SearchBar from './components/SearchBar'
import QueryResults from './components/QueryResults';

import { getData } from './utils/api';
import type { Material } from './utils/api';

import './App.css'

function App() {

  const [queryResults, setQueryResults] = useState<Material[]>([]);
  const [filterVal, setFilterVal] = useState<string>('');

  const searchHandler = useCallback( async(searchVal: string) => {
    // Call the API handler with query parameter
    const queryData = await getData(searchVal);
    setQueryResults(queryData)
    setFilterVal(searchVal);

  }, []);

  return (
    <>
      <h1>Materials Dataset</h1>
      <div>
        Enter a brand name, manufacturer name, materials name or materials id (formula) to retrieve filtered restuls.
      </div>
      <SearchBar searchCallback={searchHandler} filterVal={filterVal}/>
      <QueryResults data={queryResults} filter={filterVal} searchCallback={searchHandler}/>
    </>

  )
}

export default App
