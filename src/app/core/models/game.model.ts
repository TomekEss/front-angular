import { Profile } from './profile.model';

export interface Game {
  slug: string;
  author: Profile;
  name: string;
  typ: string;
  image: any;
  link: any;
  opis: string;
  kategorieList: string[];
  body: string;
  premiera: Date;
  ram: number;
  procesorintel: string;
  procesoramd: string;
  grafikanvidia: string;
  grafikaamd: string;
  createdAt: string;
  updateAt: string;
  vote_average: number;
  photo: any;
  zdjecie: any;
}
