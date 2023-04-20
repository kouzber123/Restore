import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton, List, ListItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";


interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" }
];
const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" }
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500"
  },
  "&.active": {
    color: "text.secondary"
  }
};
export default function Header({ darkMode, handleThemeChange }: Props) {
  const {basket} = useAppSelector(state => state.basket);
  const ItemCount = basket?.items.reduce((sum , item) => sum + item.quantity, 0)
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/"  sx={navStyles}>
            RE-STORE
          </Typography>
          <Switch color="default" checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton component={Link} to="/basket"  size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={ItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

//e: React.ChangeEvent<HTMLInputElement>
