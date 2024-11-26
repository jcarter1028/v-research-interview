import { useState, useEffect, ChangeEvent } from "react"

import './SearchBar.css'


type SearchBarProps = {
  searchCallback:   (filter: string) => void,
}

function SearchBar({ searchCallback }: SearchBarProps) {


  const [val, setVal] = useState<string>("");

  const submitHandler = () => {
    searchCallback(val);
  }
  return (
    <>
    <div className='searchBar'>
      <input onChange={e => setVal(e.target.value)}></input>
      <button onClick={submitHandler}>Search</button>
    </div>

    </>
  )
}

export default SearchBar
