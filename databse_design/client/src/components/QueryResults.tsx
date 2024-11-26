import type { Material } from "../utils/api"


type RowProps = {
    data: Material
}
function Row({ data }: RowProps) {
    return (
        <tr>
            <td>{data.materialName}</td>
            <td>{data.materialId}</td>
            <td>{data.cas}</td>
            <td>{data.manufacturerName}</td>
            <td>{data.brandType}</td>
            <td>{data.brandName}</td>
            <td>{data.ghg}</td>
            <td>{data.energyInput}</td>
            <td>{data.euReguation}</td>
            <td>{data.supplyRisk}</td>
            <td>{data.criticalValue}</td>
        </tr>
    )
}

type TableProps = {
    data: Material[]
}
function Table({ data }: TableProps) {
    return (
        <table>
            <tr>
                <th>Material Id</th>
                <th>Material Name</th>
                <th>CAS</th>
                <th>Manufacturer Name</th>
                <th>Brand Type</th>
                <th>Brand Name</th>
                <th>GHG</th>
                <th>Energy Input</th>
                <th>EU Rgulation</th>
                <th>Supply Risk</th>
                <th>Critical Value</th>
            </tr>
            {data.map((d,i) => <Row data={d} key={i}/>)}
        </table>
    )

}

type QueryResultsProps = {
    data: Material[]
}
function QueryResults({ data }: QueryResultsProps) {
  return (
        <div>
            <h2>Results:</h2>   
            <Table data={data}/>
        </div>
  )
}
export default QueryResults
