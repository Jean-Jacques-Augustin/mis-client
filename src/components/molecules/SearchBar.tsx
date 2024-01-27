import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
    placeholder: string;
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(searchQuery);
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
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputProps={{ "aria-label": "search_products" }}
                onChange={(event) => setSearchQuery(event.target.value)}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
