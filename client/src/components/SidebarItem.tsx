import { ListItemButton, ListItemIcon } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import colorConfigs from "../configs/colorConfigs";
import { RootState } from "../store/store";
import { RouteType } from "../routes/config";

type Props = {
  item: RouteType;
}

const SidebarItem = ({ item }: Props) => {
  const { appState } = useAppSelector((state: RootState) => state.appState);
  return (
    item.sidebarProps && item.path ? (
      item.sidebarProps.displayText ? (
        
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          "&: hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg
          },
          backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
          paddingY: "12px",
          paddingX: "24px",
          fontSize: "24px"

        }}
      >
        <ListItemIcon sx={{
          // color: colorConfigs.sidebar.color
        }}>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {item.sidebarProps.displayText}
      </ListItemButton>
      ) : (
          <ListItemButton
            sx={{
              "&: hover": {
                backgroundColor: colorConfigs.sidebar.hoverBg
              },
              backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
              paddingY: "12px",
              paddingX: "24px",
              fontSize: "24px"
            }}
          >
            <ListItemIcon sx={{
              // color: colorConfigs.sidebar.color
            }}>
              {item.sidebarProps.icon && item.sidebarProps.icon}
            </ListItemIcon>
            {item.sidebarProps.displayText}
          </ListItemButton>
      )
    ) : null
  );
};

export default SidebarItem;