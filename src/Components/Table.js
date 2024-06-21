import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
getSortedRowModel,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  try {
    const res = await axios.get(`https://dummyjson.com/users`);
    console.log(res.data.users);
    return res.data.users; // Ensure you are returning the array of users
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
};

const Table = () => {
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "FirstName",
      accessorKey: "firstName",
    },
    {
      header: "LastName",
      accessorKey: "lastName",
    },
    {
      header: "Maiden Name",
      accessorKey: "maidenName",
    },
    {
      header: "Age",
      accessorKey: "age",
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "UserName",
      accessorKey: "username",
    },
    {
      header: "Password",
      accessorKey: "password",
    },
    {
      header: "BirthDate",
      accessorKey: "birthDate",
    },
  ];
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const table = useReactTable({
    data: data || [], // Ensure data is not null
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },

    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    getSortedRowModel:getSortedRowModel()
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <div>
      <h2 className="flex justify-center text-3xl text-bolder mt-5">
        Users Table
      </h2>
      <div class=" mt-5 relative w-full justify-center">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Here ..."
          required
        />
      </div>

      <table class="w-full mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
 <thead className="text-lg pt-20 pb-20 text-gray-700 uppercase bg-[#999999] text-white dark:text-gray-400">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            <span>
                                                {{
                                                    asc: "🔼",
                                                    desc: "🔽"
                                                }[
                                                    header.column.getIsSorted() ?? null
                                                ]}
                                            </span>
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead> 
        <tbody class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="  flex justify-around mt-5  pb-5  bg-[#eeeeee]">
        <button
          className="bg-[#429def] mt-5 pt-2 pb-2 pl-2 pr-2  text-white rounded"
          onClick={() => table.setPageIndex(0)}
        >
          First Page
        </button>
        <button
          className="bg-[#429def] mt-5 pt-2 pb-2 pl-2 pr-2  text-white rounded"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage(0)}
        >
          Previous Page
        </button>
        <button
          className="bg-[#429def] mt-5 pt-2 pb-2 pl-2 pr-2  text-white rounded"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button
          className="bg-[#429def] mt-5 pt-2 pb-2 pl-2 pr-2  text-white rounded"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default Table;








