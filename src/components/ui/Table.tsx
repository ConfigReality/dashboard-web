// create table component
interface TableProps {
  data?: any[],
  onRowClick?: (row: any) => void,
  withDelection?: boolean,
  onDeleteRow?: (id: string) => Promise<void>
}
const Cell = ({ value }: { value: string[] | string }) => {
  return <td className="border-black border-solid border-2 p-2">
    {
      Array.isArray(value) ?
        <ul>
          {value.map((item, i) => <li key={i}>{item}</li>)}
        </ul> :
        value
    }
  </td>
}

export const Table: React.FC<TableProps> = ({ data, onRowClick, withDelection = false, onDeleteRow }) => {
  const columns = data && data.length > 0 ? Object.keys(data[0]) : []
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          {columns.map((column, i) => (
            <th key={i}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody >
        {data && data.map((row, i) => {
          return (
            <tr key={i} onClick={(e) => { 
              onRowClick && onRowClick(row) 
            }}>
              {columns.map((cell, _i) => {
                return <Cell key={_i} value={typeof (row[cell]) === 'object' ? JSON.stringify(row[cell], null, 2) : row[cell]} />
              })}
              <td className={`border-black border-solid border-2 p-2 ${withDelection ? '' : 'hidden'}`}>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                  onClick={(e)=>{ e.stopPropagation(); onDeleteRow && onDeleteRow(row.id) }}>
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}