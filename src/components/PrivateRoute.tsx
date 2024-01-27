import {Navigate, Route, RouteProps} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import React from "react";

const PrivateRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
    const isConnected = useSelector((state: RootState) => state.user.user.isLogged);
    const isAdmin = useSelector((state: RootState) => state.user.user.isAdmin);

    if (!isConnected && !isAdmin) {
        return <Navigate to="/login" />;
    }

    return <Route {...rest} element={element} />;
};

export default PrivateRoute;