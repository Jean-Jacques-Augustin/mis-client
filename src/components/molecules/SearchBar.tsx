import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
    placeholder: string;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder, onSearch}) => {
    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch();
    };

    return (
        <Paper
            variant={"outlined"}
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
            }}>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder={placeholder}
                inputProps={{"aria-label": "search google maps"}}
            />
            <IconButton type="submit" sx={{p: "10px"}} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
