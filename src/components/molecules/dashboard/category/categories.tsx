import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import PageHeader from "../../../atoms/PageHeader";
import CrudButton from "../../../atoms/CrudButton";
import {useGetAllCategoryQuery} from "../../../../store/apiSlice";
import {useIntl} from "react-intl";

export default function Categories() {
    const {data: categories, isLoading, error} = useGetAllCategoryQuery();
    const locale = useIntl().locale;

    console.log(categories);

    const handleEdit = (category: any) => {
        console.log(category);
    };

    const handleDelete = (category: any) => {
        console.log(category);
    };

    // @ts-ignore
    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Nom",
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            align: "right",
            renderCell: (params) => (
                <CrudButton
                    element={params.row}
                    actions={{
                        onEdit: handleEdit,
                        onDelete: handleDelete,
                    }}
                />
            ),
        },
    ];

    if (isLoading) return <CircularProgress/>;
    if (error)
        return <div>Error: {"message" in error ? error.message : "Erreur"}</div>;

    const rows = categories?.data.map((category: {
        _id: any;
        name: any;
        description: any;
    }) => ({
        id: category._id,
        _id: category._id,
        name: category.name[locale],
        description: category.description[locale]
    }));


return (
    <Box>
        <PageHeader
            title="category"
            buttonLabel="New Category"
            buttonColor="primary"
            to="/dashboard/addCategory"
        />
        <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            loading={isLoading}
        />
    </Box>
);
}
