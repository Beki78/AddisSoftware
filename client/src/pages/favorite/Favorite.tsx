import { useState } from "react";
import { Theme } from "./favorite.types";
import {
  FavoriteContainer,
  FavoriteTitle,
  HeartIcon,
  SongArtist,
  SongDetails,
  SongImage,
  SongItem,
  SongList,
  SongText,
  SongTitle,
} from "./LikedStyle";

// Favorite Component
const Favorite = ({ theme }: { theme: Theme }) => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      image:
        "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_album-covers-d12ef0296af80b58363dc0deef077ecc.jpg?ts%20=%201698246112",
      title: "Song Title 1",
      artist: "Artist 1",
    },
    {
      id: 2,
      image:
        "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_album-covers-d12ef0296af80b58363dc0deef077ecc.jpg?ts%20=%201698246112",
      title: "Song Title 2",
      artist: "Artist 2",
    },
    {
      id: 3,
      image:
        "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_album-covers-d12ef0296af80b58363dc0deef077ecc.jpg?ts%20=%201698246112",
      title: "Song Title 3",
      artist: "Artist 3",
    },
  ]);

  const handleToggleFavorite = (id: number) => {
    setFavorites(favorites.filter((song) => song.id !== id));
  };

  return (
    <FavoriteContainer theme={theme}>
      <FavoriteTitle>My Favorite Music</FavoriteTitle>
      <SongList>
        {favorites.map((song) => (
          <SongItem key={song.id} theme={theme}>
            <SongDetails>
              <SongImage src={song.image} alt="" />
              <SongText>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist theme={theme}>{song.artist}</SongArtist>
              </SongText>
            </SongDetails>
            <HeartIcon
              isFavorite={true}
              theme={theme}
              onClick={() => handleToggleFavorite(song.id)}
            />
          </SongItem>
        ))}
      </SongList>
    </FavoriteContainer>
  );
};

export default Favorite;
