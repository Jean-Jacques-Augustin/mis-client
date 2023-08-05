import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box} from '@mui/material';
import PageHeader from '../../../../atoms/PageHeader';
import CrudButton from '../../../../atoms/CrudButton';
import {useGetAllCategoryQuery} from '../../../../../store/apiSlice';
import {FormattedMessage} from "react-intl";

export default function Categories() {
    const {data: categories, isLoading, error} = useGetAllCategoryQuery();

    const handleEdit = (category: any) => {
        console.log(category);
    };

    const handleDelete = (category: any) => {
        console.log(category);
    };

    if (isLoading) return <CircularProgress/>;
    if (error) return <div>Error: {"message" in error ? error.message : 'Erreur'}</div>;

    return (
        <Box>
            <PageHeader title="category" buttonLabel="New Category" buttonColor="primary" to="/dashboard/addCategory"/>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#000000'}}>
                                <FormattedMessage id="name"/>
                            </TableCell>
                            <TableCell
                                sx={{fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#000000'}}
                            >
                                <FormattedMessage id="description"/>
                            </TableCell>
                            <TableCell align="right"
                                        sx={{fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#000000'}}
                            >
                                <FormattedMessage id="actions"/>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.data.map((category: any) => (
                            <TableRow key={category.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    {category.name.mg}
                                </TableCell>
                                <TableCell>{category.description.mg}</TableCell>
                                <TableCell align="right">
                                    <CrudButton element={category}
                                                actions={{onEdit: handleEdit, onDelete: handleDelete}}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
