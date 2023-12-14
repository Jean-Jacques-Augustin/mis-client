import React, {useState, createContext, useContext, ReactNode} from "react";

interface CounterContextType {
    count: number;
    setCount: (value: number) => void;
}

const CounterContext = createContext<CounterContextType>({
    count: 0,
    setCount: () => {},
});

export const useCounter = () => useContext(CounterContext);

interface CounterProviderProps {
    children: ReactNode;
}

const CounterProvider: React.FC<CounterProviderProps> = ({children}) => {
    const [count, setCount] = useState<number>(0);

    return (
        <CounterContext.Provider value={{count, setCount}}>
            {children}
        </CounterContext.Provider>
    );
};

export default CounterProvider;
