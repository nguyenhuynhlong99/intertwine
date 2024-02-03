import { atom } from 'recoil';

const userAtom = atom({
  key: 'userAtom',
  default: JSON.parse(localStorage.getItem('intertwine-user') || '""'),
});

export default userAtom;
