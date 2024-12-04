import { useState,  useEffect} from "react"

import './SearchBar.css'


type SearchBarProps = {
  filterVal: string,
  searchCallback:   (filter: string) => void,
}

function SearchBar({ searchCallback, filterVal }: SearchBarProps) {

  const [val, setVal] = useState<string>(filterVal);
  
  const submitHandler = () => {
    // Future Works: input validation
    searchCallback(val);
  }

  useEffect(() => {
    setVal(filterVal);
  }, [filterVal])

  return (
    <div className='searchBar'>
      <input onChange={e => setVal(e.target.value)} value={val}></input>
      <button onClick={submitHandler}>Search</button>
    </div>
  )
}

export default SearchBar
