import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Divider } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        paperprops={{
          lg: {
            width: 600,
          },
        }}
      >
        <ListItem component={Link} to="/profile" key={1}>
          <ListItemButton>
            <ListItemIcon>
              <CgProfile color="black" size={20} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  type="body2"
                  style={{ color: "#03045e", fontWeight: 400 }}
                >
                  Profile
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/profile/history" key={2}>
          <ListItemButton>
            <ListItemIcon>
              <AiFillEye color="black" size={20} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  type="body2"
                  style={{ color: "#03045e", fontWeight: 400 }}
                >
                  History
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/profile/saved" key={3}>
          <ListItemButton>
            <ListItemIcon>
              <AiFillHeart color="black" size={20} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  type="body2"
                  style={{ color: "#03045e", fontWeight: 400 }}
                >
                  Saved
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/profile/friends" key={4}>
          <ListItemButton>
            <ListItemIcon>
              <FaUserFriends color="black" size={20} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  type="body2"
                  style={{ color: "#03045e", fontWeight: 400 }}
                >
                  Following
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/profile/edit" key={5}>
          <ListItemButton>
            <ListItemIcon>
              <MdModeEdit color="black" size={20} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  type="body2"
                  style={{ color: "#03045e", fontWeight: 400 }}
                >
                  Edit
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <GiHamburgerMenu color="#03045e" size={40} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
