import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
interface Props {
  userAddedRow: FormData | undefined;
}

function Grid({ userAddedRow }: Props) {
  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      type: "number",
      filterable: true,
      sortable: true,
      width: 10,
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      filterable: true,
      sortable: true,
      width: 160,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      filterable: true,
      sortable: true,
      width: 10,
      editable: true,
    },

    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 160,
      editable: true,

      renderCell: (params: any) => {
        return <a href={params.value}> {params.value}</a>;
      },
    },
    {
      field: "date",
      headerName: "DOB",
      type: "date",
      filterable: true,
      editable: true,
    },
    {
      field: "website",
      headerName: "Website",
      type: "string",
      filterable: true,
      sortable: true,
      width: 160,
      editable: true,
    },
    {
      field: "location",
      headerName: "Is a Vancouverite ?",
      type: "boolean",
      editable: true,
      width: 150,
    },
    {
      field: "company",
      headerName: "Company",
      type: "string",
      filterable: true,
      sortable: true,
      width: 160,
      editable: true,
    },
  ];

  const [rows, setRows] = React.useState<any>([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      date: new Date("1991-09-01"),
      location: true,
      email: "john.doe@gmail.com",
      website: "www.google.com",
      company: "Taking Root",
    },
    {
      id: 2,
      name: "Mary Jane",
      age: 30,
      location: false,
      date: new Date("1991-09-01"),
      email: "john.doe@gmail.com",
      website: "www.google.com",
      company: "Taking Root",
    },
    {
      id: 3,
      name: "Tambi Asawo",
      date: "1991-09-01",
      age: 30,
      location: true,
      email: "john.doe@gmail.com",
      website: "www.google.com",
      company: "Google",
    },
    {
      id: 4,
      name: "Moses Bright",
      date: new Date("1990-01-01"),
      age: 30,
      location: false,
      email: "john.doe@gmail.com",
      website: "www.google.com",
      company: "Taking Root",
    },
    {
      id: 5,
      date: new Date("1990-01-01"),
      name: "John Simps",
      age: 30,
      location: false,

      email: "john.doe@gmail.com",
      website: "www.google.com",
      company: "Taking Root",
    },
  ]);

  React.useEffect(() => {
    if (userAddedRow) addNewRow();
  }, [userAddedRow]);

  const addNewRow = () => {
    setRows([...rows, userAddedRow]);
  };

  console.log({ userAddedRow });
  return (
    <div style={{ height: 450, width: "100%", marginTop: 9 }}>
      <DataGrid
        columns={columns}
        rows={rows}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

export default Grid;
