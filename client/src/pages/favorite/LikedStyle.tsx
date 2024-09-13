import styled from "@emotion/styled";
import { FaHeart } from "react-icons/fa";
import { Theme } from "./favorite.types";

// Styled components
export const FavoriteContainer = styled.div<{ theme: Theme }>`
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

export const FavoriteTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const SongList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SongItem = styled.li<{ theme: Theme }>`
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

export const SongDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

export const SongTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const SongArtist = styled.span<{ theme: Theme }>`
  font-size: 1rem;
  color: ${({ theme }) => (theme === "dark" ? "#9ca3af" : "#6b7280")};
`;

export const HeartIcon = styled(FaHeart)<{ isFavorite: boolean; theme: Theme }>`
  color: ${({ isFavorite, theme }) =>
    isFavorite ? (theme === "dark" ? "#ef4444" : "#dc2626") : "#9ca3af"};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => (theme === "dark" ? "#ef4444" : "#dc2626")};
  }
`;
export const SongImage = styled.img`
  width: 4rem;
  border-radius: 30%;
`;
export const SongText = styled.div`
  display: flex;
  flex-direction: column;
`;
