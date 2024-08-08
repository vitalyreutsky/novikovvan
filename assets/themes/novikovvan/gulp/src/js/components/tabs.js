import GraphTabs from "graph-tabs";

const tabsItems = document.querySelectorAll(".tabs");
tabsItems.forEach((tabsItem) => {
  if (tabsItem) {
    const tabs = new GraphTabs("reviews");
    const tabsPrograms = new GraphTabs("programs");
  }
});
