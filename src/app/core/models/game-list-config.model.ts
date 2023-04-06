export interface GameListConfig {
  type: string;

  filters: {
    kategorie?: string,
    author?: string,
    favorited?: string,
    limit?: number,
    offset?: number
  };
}
