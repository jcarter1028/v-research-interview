import type { Material } from "../utils/api"

import './QueryResults.css';

type CellProp = {
    label: string | JSX.Element,
    filterValue: string,
    searchCallback: (filter: string) => void
}
function FilterCell ( { label, filterValue, searchCallback} :  CellProp) {
    const clickHandler = () => {
        searchCallback(filterValue);
    }
    return (
        <td>
            <div className='filterCell' onClick={clickHandler}>{label}</div>
        </td>
    )
}

type MaterialCellLabelProps = {
    id: string,
    name: string,
    cas: string
}
function MaterialCellLabel( { id, name, cas}: MaterialCellLabelProps ): JSX.Element {
    return (
        <>
            <div><span className="boldText">{name}</span> ({id})</div>
            <div>CAS: {cas}</div>
        </>
    )
}

type RowProps = {
    data: Material
    searchCallback: (filter: string) => void
}

function Row({ data, searchCallback }: RowProps) {

    return (
        <tr>
            <FilterCell 
                label={`${data.brand_name} (${data.brand_type})`}
                filterValue={data.brand_name} 
                searchCallback={searchCallback}
            />
            <FilterCell 
                label={data.manufacturer_name}
                filterValue={data.manufacturer_name}
                searchCallback={searchCallback}/>
            <FilterCell 
                label={<MaterialCellLabel id={data.material_id} name={data.material_name} cas={data.cas}/>}
                searchCallback={searchCallback}
                filterValue={data.material_id}
                />
            <td>{data.ghg !== null ? data.ghg.toFixed(2) : null}</td>
            <td>{data.energy_input !== null ? data.energy_input.toFixed(2) : null}</td>
            <td>{data.eu_regulation}</td>
            <td>{data.supply_risk}</td>
            <td>{data.critical_value}</td>
        </tr>
    )
}

type TableProps = {
    data: Material[],
    searchCallback: (filter: string) => void
}
function Table({ data, searchCallback }: TableProps) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Brand</th>
                    <th>Manufacturer</th>
                    <th>Material</th>
                    <th>GHG</th>
                    <th>Energy Input</th>
                    <th>EU Regulation</th>
                    <th>Supply Risk</th>
                    <th>Critical Value</th>
                </tr>
                {data.map((d,i) => <Row data={d} key={i} searchCallback={searchCallback}/>)}
            </tbody>
        </table>
    )

}

type QueryResultsProps = {
    filter: string,
    data: Material[],
    searchCallback: (filter: string) => void
}
function QueryResults({ data, filter, searchCallback }: QueryResultsProps) {
    console.log("data: ", data);
  return (
        <div>
            <h2>Results:</h2>   
            {data.length > 0 ? 
            <div>
                <div className="filter-text">Filtering using: <span className="boldText">{filter}</span></div>
                <Table data={data} searchCallback={searchCallback}/>
            </div>
                : 
                <div>No data to display</div>}
        </div>
  )
}
export default QueryResults
