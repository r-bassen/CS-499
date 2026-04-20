import { User } from '../app/models/user';

describe('User', () => {
  it('should create an instance', () => {
    const user: User = {
      email: '',
      name: ''
    };

    expect(user).toBeTruthy();
  });
});
