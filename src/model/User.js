import { PROFILE_AVATAR } from '@/configuration/resources';
import UserRole from './UserRole';

class User {
  constructor(data) {
    this.name = data.userFullName;
    this.username = data.username;
    this.email = data.email;
    this.phone = data.phone;
    this.image = PROFILE_AVATAR;
    this.userType = data.userType;
    this.role = new UserRole({ name: 'Admin', appMenu: data.appMenu || [] });
    this.token = data.token;
  }
}

export default User;
