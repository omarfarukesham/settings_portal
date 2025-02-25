class AppMenu {
  constructor(data) {
    this.portalName = data.portalName;
    this.icon = data.icon;
    this.label = data.label;
    this.link = data.link;
    this.children = data.children?.map((sMenu) => new Submenu(sMenu));
  }
}

export default AppMenu;

class Submenu {
  constructor(data) {
    this.label = data.label;
    this.link = data.link;
  }
}
