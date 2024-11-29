import type { Material } from "../utils/api"


type CellProp = {
    value: string,
    searchCallback: (filter: string) => void
}
function FilterCell ( { value, searchCallback} :  CellProp) {
    const clickHandler = () => {
        searchCallback(value);
    }
    return (
        <td>
            <div onClick={clickHandler}>{value}</div>
        </td>
    )
}
type RowProps = {
    data: Material
    searchCallback: (filter: string) => void
}
function Row({ data, searchCallback }: RowProps) {

    return (
        <tr>
            <FilterCell value={data.brand_name} searchCallback={searchCallback}/>
            <td>{data.brand_type}</td>
            <FilterCell value={data.manufacturer_name} searchCallback={searchCallback}/>
            <FilterCell value={data.material_id} searchCallback={searchCallback}/>
            <FilterCell value={data.material_name} searchCallback={searchCallback}/>
            <td>{data.cas}</td>
            <td>{data.ghg}</td>
            <td>{data.energy_input}</td>
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
                    <th>Brand Name</th>
                    <th>Brand Type</th>
                    <th>Manufacturer Name</th>
                    <th>Material Id</th>
                    <th>Material Name</th>
                    <th>CAS</th>
                    <th>GHG</th>
                    <th>Energy Input</th>
                    <th>EU Rgulation</th>
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
                <div>Filtering using: {filter}</div>
                <Table data={data} searchCallback={searchCallback}/>
            </div>
                : 
                <div>No data to display</div>}
        </div>
  )
}
export default QueryResults
