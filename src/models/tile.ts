export type Tile = {
  id?: string;
  position: [number, number];
  value: number;
  team: string;
};

export type Team = {
  team: string;
}

export type TileMap = { [id: string]: Tile };
