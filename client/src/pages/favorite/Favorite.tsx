import  { useState } from "react";
import styled from "@emotion/styled";
import { FaHeart } from "react-icons/fa";

// Define the strict Theme type
type Theme = "light" | "dark";

// Styled components
const FavoriteContainer = styled.div<{ theme: Theme }>`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1f2937" : "#f9fafb"};
  color: ${({ theme }) => (theme === "dark" ? "#f9fafb" : "#1f2937")};
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0px 4px 15px rgba(255, 255, 255, 0.1)"
      : "0px 4px 15px rgba(0, 0, 0, 0.1)"};
`;

const FavoriteTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SongList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SongItem = styled.li<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#111827" : "#ffffff"};
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#1f2937" : "#f3f4f6"};
  }
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const SongTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
`;

const SongArtist = styled.span<{ theme: Theme }>`
  font-size: 1rem;
  color: ${({ theme }) => (theme === "dark" ? "#9ca3af" : "#6b7280")};
`;

const HeartIcon = styled(FaHeart)<{ isFavorite: boolean; theme: Theme }>`
  color: ${({ isFavorite, theme }) =>
    isFavorite ? (theme === "dark" ? "#ef4444" : "#dc2626") : "#9ca3af"};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => (theme === "dark" ? "#ef4444" : "#dc2626")};
  }
`;
const SongImage = styled.img`
  width: 4rem;
  border-radius: 30%;
`;
const SongText = styled.div`
  display: flex;
  flex-direction: column;
`;
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
