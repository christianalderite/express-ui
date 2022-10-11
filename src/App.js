
import React, { useMemo, useState, useEffect } from "react";
import PayinsTable from './components/PayinsTable';
import axios from 'axios';


function App() {
  
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
        const result = await axios("http://localhost:5000/api/payins");
        setData(result.data);
        console.log(result.data);
      })();
  }, []);
  
  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
  const columns = useMemo(
    () => [
      {
        Header: "Payins",
        columns: [
          {
            Header: "Transaction ID",
            accessor: "id"
          },
          {
            Header: "Reference Code",
            accessor: "reference_code"
          },
          {
            Header: "Currency",
            accessor: "currency"
          },
          {
            Header: "Amount",
            accessor: "amount"
          },
          {
            Header: "Description",
            accessor: "description"
          },
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Status Code",
            accessor: "status_code"
          }
        ]
      },
    ],
    []
  );

  return (
    <div className="App">
      <PayinsTable columns={columns} data={data} />
    </div>
  );
}

export default App;