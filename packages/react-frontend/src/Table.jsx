// src/Table.jsx
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}
function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
            <button onClick={() => props.removecharacter(index)}>
                Delete
            </button>
        </td>
      </tr>
    );
   }
  );
  return (
      <tbody>
        {rows}
       </tbody>
   );
}

function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody 
        characterData={props.characterData} 
        removecharacter={props.removecharacter}
        />
      </table>
    );
}
export default Table;