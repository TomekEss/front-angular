import { Profile } from './profile.model';

export interface Article {
  slug: string;
  titl: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
  photo: string; // base64
  image: any;
}
