const permissions = ['view_dashboard', 'view_settings'];

class UserRole {
  constructor(data) {
    this.name = data.name;
    this.appMenu = data.appMenu;
    this.permissions = permissions;
  }
}

export default UserRole;
