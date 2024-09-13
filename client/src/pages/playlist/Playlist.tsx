/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchMusic, deleteMusic, updateMusic } from "../../api/musicApi";
import {
  CancelButton,
  DeleteButton,
  EditButton,
  EditButtonComp,
  FileInput,
  Icons,
  InputField,
  InputLabel,
  InputWrapper,
  ModalButton,
  ModalContent,
  ModalOverlay,
  NotFoundText,
  PlaylistContainer,
  PlaylistTitle,
  SongArtist,
  SongDetails,
  SongImage,
  SongItem,
  SongList,
  SongText,
  SongTitle,
} from "./PlaylistStyle";
import { Theme } from "./Playlist.types";

// Playlist Component
const Playlist = ({ theme }: { theme: Theme }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [songs, setSongs] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editArtist, setEditArtist] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Fetch data from the backend
  const getData = async () => {
    try {
      const data = await fetchMusic();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (overlayRef.current && overlayRef.current.contains(event.target as Node)) {
          setModalVisible(false);
          setModalEditVisible(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = (id: string) => {
    console.log("Delete button clicked for song:", id);
    setSelectedSongId(id);
    setModalVisible(true);
  };

  const handleCloseModal = () => setModalVisible(false);

  const handleConfirmDelete = async () => {
    if (selectedSongId) {
      console.log("Making delete API call for song:", selectedSongId);
      try {
        await deleteMusic(selectedSongId);
        setSongs(songs.filter((song) => song._id !== selectedSongId));
        setModalVisible(false);
      } catch (error) {
        console.error("Error deleting music:", error);
      }
    } else {
      console.log("No song selected for deletion");
    }
  };
 

  const handleUpdateClick = async () => {
    if (selectedSongId) {
      console.log("Making update API call for song:", selectedSongId);
      try {
        const updatedData = {
          title: editTitle,
          artist: editArtist,
        };
        const updatedSong = await updateMusic(selectedSongId, updatedData);
        setSongs(
          songs.map((song) =>
            song._id === selectedSongId ? { ...song, ...updatedSong } : song
          )
        );
        setModalEditVisible(false);
      } catch (error) {
        console.error("Error updating music:", error);
      }
    } else {
      console.log("No song selected for updating");
    }
  };

  return (
    <PlaylistContainer theme={theme}>
      <PlaylistTitle>All Music</PlaylistTitle>
      <SongList>
        {songs.length > 0 ? (
          songs.map((song) => (
            <SongItem key={song._id} theme={theme}>
              <SongDetails>
                <SongImage
                  src="https://via.placeholder.com/150"
                  alt={song.title}
                />
                <SongText>
                  <SongTitle>{song.title}</SongTitle>
                  <SongArtist theme={theme}>{song.artist}</SongArtist>
                </SongText>
              </SongDetails>
              <Icons>
                <FaPen
                  css={EditButton}
                  onClick={() => {
                    setEditTitle(song.title);
                    setEditArtist(song.artist);
                    setSelectedSongId(song._id);
                    setModalEditVisible(true);
                  }}
                />
                <MdDelete
                  css={DeleteButton}
                  onClick={() => handleDeleteClick(song._id)}
                />
              </Icons>
            </SongItem>
          ))
        ) : (
          <NotFoundText>No music found.</NotFoundText>
        )}
      </SongList>

      {/* Delete Modal */}
      <ModalOverlay visible={modalVisible} ref={overlayRef}>
        <ModalContent theme={theme} ref={modalRef}>
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this item?</p>
          <div>
            <ModalButton theme={theme} onClick={handleConfirmDelete}>
              Delete
            </ModalButton>
            <CancelButton theme={theme} onClick={handleCloseModal}>
              Cancel
            </CancelButton>
          </div>
        </ModalContent>
      </ModalOverlay>

      {/* Edit Modal */}
      <ModalOverlay visible={modalEditVisible} ref={overlayRef}>
        <ModalContent theme={theme} ref={modalRef}>
          <h2>Update Music</h2>
          <InputWrapper>
            <FileInput type="file" theme={theme} />
            <div>
              <InputLabel htmlFor="title" theme={theme}>
                Title
              </InputLabel>
              <InputField
                type="text"
                placeholder="Music title"
                id="title"
                theme={theme}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <InputLabel htmlFor="artist" theme={theme}>
                Artist
              </InputLabel>
              <InputField
                type="text"
                placeholder="Artist"
                id="artist"
                theme={theme}
                value={editArtist}
                onChange={(e) => setEditArtist(e.target.value)}
              />
            </div>
          </InputWrapper>
          <div>
            <EditButtonComp theme={theme} onClick={handleUpdateClick}>
              Update
            </EditButtonComp>
            <CancelButton
              theme={theme}
              onClick={() => setModalEditVisible(false)}
            >
              Cancel
            </CancelButton>
          </div>
        </ModalContent>
      </ModalOverlay>
    </PlaylistContainer>
  );
};

export default Playlist;
