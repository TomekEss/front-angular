import { Profile } from './profile.model';

export interface Vote {
  id: number;
  vote: number;
  author: Profile;
}
