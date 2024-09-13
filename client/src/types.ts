// src/types.ts
export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
}

export interface ApiResponse<T> {
  data: T;
}
