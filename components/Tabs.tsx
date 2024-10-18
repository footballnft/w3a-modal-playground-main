import React from "react";
import { Tabs as MuiTabs, Tab } from "@mui/material";

interface TabsProps {
  tabData: { tabName: string; onClick?: () => void; active?: boolean }[];
}

const Tabs: React.FC<TabsProps> = ({ tabData }) => {
  return (
    <MuiTabs value={tabData.findIndex(tab => tab.active)} aria-label="Navigation Tabs">
      {tabData.map((tab, index) => (
        <Tab
          key={index}
          label={tab.tabName}
          onClick={tab.onClick}
          sx={{
            textTransform: "none",
            fontWeight: tab.active ? "bold" : "normal",
            color: tab.active ? "primary.main" : "text.secondary",
            borderBottom: tab.active ? 2 : 1,
            borderColor: tab.active ? "primary.main" : "transparent",
          }}
        />
      ))}
    </MuiTabs>
  );
};

export default Tabs;
