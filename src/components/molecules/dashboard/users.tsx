import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useGetAllUsersQuery} from "../../../store/apiSlice";
import PageHeader from "../../atoms/PageHeader";
import {FormattedMessage} from "react-intl";
import {Button} from "@mui/material";

/**
 * {"data":[{"_id":"65b3e04c4b07de50b5b41565","name":"Admin","email":"admin@default.com","password":"$2b$10$CWLwWSpmcI3tvaennkP.8.Q9nb4L0zQdhA2roBl7UNVTqgLPQ73IC","role":"admin","verified":false,"verificationCode":null,"createdAt":"2024-01-26T16:39:40.196Z","__v":0}],"message":"findAll"}
 */

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        editable: false,
        flex: 1,
    },
    {
        field: 'name',
        headerName: 'Nom',
        editable: false,
        flex: 1,
    },
    {
        field: 'email',
        headerName: 'Adresse Email',
        editable: false,
        flex: 1,
    },
    {
        field: 'role',
        headerName: 'Role',
        editable: false,
        flex: 1,
    },
    {
        field: 'verified',
        headerName: 'A été vérifié',
        editable: false,
        width: 100,
        flex: 1,
    },
    {
        field: 'createdAt',
        headerName: 'Date de création',
        editable: false,
        width: 200,
        flex: 1,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        editable: false,
        width: 200,
        flex: 1,
        renderCell: (params) => (
            <div>
                <Button variant="outlined" color="primary" style={{marginRight: 10}}>
                    <FormattedMessage id="edit"/>
                </Button>
            </div>
        ),
    }
];

export default function Users() {
    const {data: users, isLoading, error} = useGetAllUsersQuery();

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Erreur</div>

    const rows = users?.data.map((user: {
        name: any;
        email: any;
        role: any;
        verified: any;
        createdAt: any;
    }, index: number) => {
        return {
            id: index + 1,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.verified ? "Oui" : "Non", // TODO: translate "Oui" and "Non
            createdAt: new Date(user.createdAt).toLocaleDateString() + " à " + new Date(user.createdAt).toLocaleTimeString(),
        }
    });

    return (
        <Box sx={{minHeight: 400, width: '100%'}}>
            <PageHeader
                title='users'
            />
            <DataGrid
                style={{minHeight: 400}}
                rows={rows}
                columns={columns}
                loading={isLoading}
                checkboxSelection
                disableRowSelectionOnClick
                autoHeight
            />
        </Box>
    );
}
