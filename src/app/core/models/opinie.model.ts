import { Profile } from './profile.model';

export interface Opinie {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
