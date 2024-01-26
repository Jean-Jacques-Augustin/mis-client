import * as React from "react";
import {
  Inbox as InboxIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Inventory2Icon from "@mui/icons-material/Inventory2";
export interface Route {
  path: string;
  icon: React.ReactNode;
  text: string | React.ReactNode;
}

const routes: Route[] = [
  {
    path: "/",
    icon: <InboxIcon />,
    text: "Dashboard",
  },
  {
    path: "/dashboard/product",
    icon: <Inventory2Icon />,
    text: "Products",
  },
  {
    path: "/dashboard/product",
    icon: <CategoryIcon />,
    text: "Categories",
  },
  {
    path: "/dashboard/product",
    icon: <ShoppingBasketIcon />,
    text: "Commandes",
  },
];

export default routes;
