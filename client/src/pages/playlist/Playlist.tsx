/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchMusic, deleteMusic } from "../../api/musicApi"; // Import the deleteMusic function
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
  const [songs, setSongs] = useState<any[]>([]); // Initialize empty array for fetched songs
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null); // Store the selected song ID for deletion

  // Fetch data from the backend
  const getData = async () => {
    try {
      const data = await fetchMusic(); // Fetch music from API
      setSongs(data); // Set the fetched songs
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []);

 const handleDeleteClick = (id: string) => {
   console.log("Delete button clicked for song:", id); // Log song ID
   setSelectedSongId(id);
   setModalVisible(true);
 };

  const handleCloseModal = () => setModalVisible(false);

  const handleConfirmDelete = async () => {

    if (selectedSongId) {
      console.log("Making delete API call for song:", selectedSongId); // Ensure song ID is correct
      try {
        await deleteMusic(selectedSongId);
        setSongs(songs.filter((song) => song._id !== selectedSongId));
        setModalVisible(false);
      } catch (error) {
        console.error("Error deleting music:", error); // Check for errors
      }
    } else {
      console.log("No song selected for deletion");
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);


  return (
    <PlaylistContainer theme={theme}>
      <PlaylistTitle>All Music</PlaylistTitle>
      <SongList>
        {songs.length > 0 ? (
          songs.map((song) => (
            <SongItem key={song._id} theme={theme}>
              <SongDetails>
                {/* Default image placeholder if no image in DB */}
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
                  onClick={() => setModalEditVisible(true)}
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
      <ModalOverlay visible={modalVisible}>
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
      <ModalOverlay visible={modalEditVisible}>
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
              />
            </div>
          </InputWrapper>
          <div>
            <EditButtonComp
              theme={theme}
              onClick={() => console.log("Item updated")}
            >
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
