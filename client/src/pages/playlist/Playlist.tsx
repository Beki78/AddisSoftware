/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchSongsRequest } from "../../app/features/songs/data";
import { useDispatch } from "react-redux";
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
  const [songs, setSongs] = useState([
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

  const handleDeleteClick = () => {
    setModalVisible(true);
  };
  const handleEditClick = () => {
    setModalEditVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleCloseEditModal = () => {
    setModalEditVisible(false);
  };

  const handleConfirmDelete = () => {
    // Handle the delete action here
    console.log("Item deleted");
    setModalVisible(false);
  };
  const handleConfirmEdit = () => {
    // Handle the delete action here
    console.log("Item updated");
    setModalEditVisible(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  const BackClicked = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModalVisible(false);
      setModalEditVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", BackClicked);
    return () => {
      document.removeEventListener("mousedown", BackClicked);
    };
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongsRequest()); // Dispatch action to fetch songs
  }, [dispatch]);

  return (
    <PlaylistContainer theme={theme}>
      <PlaylistTitle>All Music</PlaylistTitle>
      <SongList>
        {songs.map((song) => (
          <SongItem key={song.id} theme={theme}>
            <SongDetails>
              <SongImage src={song.image} alt="" />
              <SongText>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist theme={theme}>{song.artist}</SongArtist>
              </SongText>
            </SongDetails>
            <Icons>
              <FaPen css={EditButton} onClick={handleEditClick} />
              <MdDelete css={DeleteButton} onClick={handleDeleteClick} />
            </Icons>
          </SongItem>
        ))}
      </SongList>

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
      <ModalOverlay visible={modalEditVisible}>
        <ModalContent theme={theme} ref={modalRef}>
          <h2>Update Music</h2>
          <InputWrapper>
            <FileInput type="file" theme={theme}/>
            <div>
              <InputLabel htmlFor="title" theme={theme}>Title</InputLabel>
              <br />
              <InputField
                type="text"
                placeholder="Music title"
                id="title"
                theme={theme}
              />
            </div>
            <div>
              <InputLabel htmlFor="artist" theme={theme}>Artist</InputLabel>
              <InputField
                type="text"
                placeholder="Artist"
                id="artist"
                theme={theme}
              />
            </div>
          </InputWrapper>
          <div>
            <EditButtonComp theme={theme} onClick={handleConfirmEdit}>
              Update
            </EditButtonComp>
            <CancelButton theme={theme} onClick={handleCloseEditModal}>
              Cancel
            </CancelButton>
          </div>
        </ModalContent>
      </ModalOverlay>
    </PlaylistContainer>
  );
};

export default Playlist;
