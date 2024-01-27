import * as React from "react";
import {
    Inbox as InboxIcon,
} from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from '@mui/icons-material/People';
import {FormattedMessage} from "react-intl";

export interface Route {
    path: string;
    icon: React.ReactNode;
    text: string | React.ReactNode;
}

const routes: Route[] = [
    {
        path: "/dashboard",
        icon: <InboxIcon/>,
        text: <FormattedMessage id="dashboard"/>,
    },
    {
        path: "/dashboard/product",
        icon: <Inventory2Icon/>,
        text: <FormattedMessage id="product"/>,
    },
    {
        path: "/dashboard/category",
        icon: <CategoryIcon/>,
        text: <FormattedMessage id="category"/>,
    },
    {
        path: "/dashboard/product",
        icon: <ShoppingBasketIcon/>,
        text: <FormattedMessage id="order"/>,
    },
    {
        path: "/dashboard/users",
        icon: <PeopleIcon/>,
        text: <FormattedMessage id="users"/>,
    }
];

export default routes;
