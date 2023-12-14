import React, {useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CounterProps {
    initialCount?: number;
}

const Counter: React.FC<CounterProps> = ({initialCount = 0}) => {
    const [count, setCount] = useState<number>(initialCount);

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}>
            <Typography variant="h4">Count: {count}</Typography>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleIncrement}>
                    Increment
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDecrement}
                    sx={{ml: 2}}>
                    Decrement
                </Button>
            </Box>
        </Box>
    );
};

export default Counter;
