/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon, FaPen } from "react-icons/fa";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  CancelButton,
  Card,
  DeleteButton,
  EditButton,
  FileInput,
  Icons,
  Image,
  InputField,
  InputLabel,
  InputWrapper,
  ModalButton,
  ModalContent,
  ModalOverlay,
  Name,
  OterButtonSingle,
  OuterButton,
  PlayButtons,
  Section,
  Title,
  ToggleButton,
} from "./HomeStyle";
import {
  fetchMusic,
  deleteMusic,
  updateMusic,
  addMusic,
} from "../../api/musicApi";


const Home = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [musicList, setMusicList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedSong, setSelectedSong] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ title: "", artist: "" });

  // State to manage uploaded image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedSong(musicList.find((song) => song._id === id));
    setModalVisible(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditClick = (song: any) => {
    setSelectedSong(song);
    setModalEditVisible(true);
  };

  const handleAddClick = () => {
    setModalAddVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCloseEditModal = () => {
    setModalEditVisible(false);
  };

  const validateForm = (title: string, artist: string) => {
    const errors = { title: "", artist: "" };
    if (!title) errors.title = "Title is required";
    if (!artist) errors.artist = "Artist is required";
    setFormErrors(errors);
    return !errors.title && !errors.artist;
  };

  const handleConfirmDelete = async () => {
    if (musicList.length > 0 && selectedSong) {
      setLoading(true);
      try {
        await deleteMusic(selectedSong._id);
        const updatedList = musicList.filter(
          (song) => song._id !== selectedSong._id
        );
        setMusicList(updatedList);
        if (updatedList.length === 0) {
          setCurrentIndex(0);
        } else if (currentIndex >= updatedList.length) {
          setCurrentIndex(updatedList.length - 1);
        }
      } catch (error) {
        console.error("Error deleting music:", error);
      } finally {
        setLoading(false);
        setModalVisible(false);
      }
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      console.log(file);
      
    }
  };

  const handleConfirmEdit = async () => {
    const title = (document.getElementById("edit-title") as HTMLInputElement)
      .value;
    const artist = (document.getElementById("edit-artist") as HTMLInputElement)
      .value;

    if (validateForm(title, artist) && selectedSong) {
      setLoading(true);
      try {
        const updatedSong = { ...selectedSong, title, artist };

        // Upload the new image file if there is one
        if (editImageFile) {
          const formData = new FormData();
          formData.append("photo", editImageFile);

          // Assuming you have an API endpoint to handle file uploads
          const response = await fetch("/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          updatedSong.photo = data.filePath; // Update the song with the new image URL
        }

        await updateMusic(updatedSong._id, updatedSong);
        const updatedList = musicList.map((song) =>
          song._id === selectedSong._id ? updatedSong : song
        );
        setMusicList(updatedList);
        setSelectedSong(updatedSong);
      } catch (error) {
        console.error("Error updating item:", error);
      } finally {
        setLoading(false);
        setModalEditVisible(false);
        setEditImageFile(null); // Reset after use
      }
    }
  };


  const handleConfirmAdd = async () => {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const artist = (document.getElementById("artist") as HTMLInputElement)
      .value;

    if (validateForm(title, artist)) {
      setLoading(true);
      try {
        const newSong = {
          title,
          artist,
          photo: imageFile
            ? URL.createObjectURL(imageFile)
            : "https://via.placeholder.com/150",
        };

        await addMusic(newSong);
        setMusicList([...musicList, newSong]);
      } catch (error) {
        console.error("Error adding item:", error);
      } finally {
        setLoading(false);
        setModalAddVisible(false);
        setImageFile(null); // Reset after use
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < musicList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMusic();
        setMusicList(data);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Error fetching music:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <Section theme={theme}>
      <ToggleButton theme={theme} onClick={handleToggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </ToggleButton>

      <Card theme={theme}>
        <Icons>
          <FaPen
            css={EditButton}
            onClick={() => handleEditClick(musicList[currentIndex])}
          />
          {musicList.length > 0 && (
            <MdDelete
              css={DeleteButton}
              onClick={() => handleDeleteClick(musicList[currentIndex]._id)}
            />
          )}
        </Icons>
        {loading ? (
          <p>Loading...</p>
        ) : musicList.length > 0 ? (
          <div className="flex flex-col justify-center items-center">
            <Image
              src={
                musicList[currentIndex]?.photo ||
                "https://via.placeholder.com/150"
              }
            />
            <Title>{musicList[currentIndex]?.title || "Title"}</Title>
            <Name>{musicList[currentIndex]?.artist || "Artist"}</Name>
          </div>
        ) : (
          <p>No music found</p>
        )}
        <PlayButtons>
          <GrChapterPrevious css={OterButtonSingle} onClick={handlePrevious} />
          <GrChapterNext css={OterButtonSingle} onClick={handleNext} />
        </PlayButtons>
      </Card>

      <OuterButton>
       
        <IoAddCircleOutline css={OterButtonSingle} onClick={handleAddClick} />
        <RiPlayListFill
          css={OterButtonSingle}
          onClick={() => navigate("/playlist")}
        />
      </OuterButton>

      {/* Modals */}
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
            <FileInput
              type="file"
              onChange={(e) => handleImageChange(e, setEditImageFile)}
            />
            <div>
              <InputLabel htmlFor="edit-title">Title</InputLabel>
              <InputField
                type="text"
                placeholder="Music title"
                id="edit-title"
                theme={theme}
                defaultValue={selectedSong?.title || ""}
              />
              {formErrors.title && <p>{formErrors.title}</p>}
            </div>
            <div>
              <InputLabel htmlFor="edit-artist">Artist</InputLabel>
              <InputField
                type="text"
                placeholder="Artist"
                id="edit-artist"
                theme={theme}
                defaultValue={selectedSong?.artist || ""}
              />
              {formErrors.artist && <p>{formErrors.artist}</p>}
            </div>
          </InputWrapper>
          <div>
            <ModalButton theme={theme} onClick={handleConfirmEdit}>
              Update
            </ModalButton>
            <CancelButton theme={theme} onClick={handleCloseEditModal}>
              Cancel
            </CancelButton>
          </div>
        </ModalContent>
      </ModalOverlay>

      <ModalOverlay visible={modalAddVisible}>
        <ModalContent theme={theme} ref={modalRef}>
          <h2>Add Music</h2>
          <InputWrapper>
            <FileInput
              type="file"
              onChange={(e) => handleImageChange(e, setImageFile)}
            />
            <div>
              <InputLabel htmlFor="title">Title</InputLabel>
              <InputField
                type="text"
                placeholder="Music title"
                id="title"
                theme={theme}
              />
              {formErrors.title && <p>{formErrors.title}</p>}
            </div>
            <div>
              <InputLabel htmlFor="artist">Artist</InputLabel>
              <InputField
                type="text"
                placeholder="Artist"
                id="artist"
                theme={theme}
              />
              {formErrors.artist && <p>{formErrors.artist}</p>}
            </div>
          </InputWrapper>
          <div>
            <ModalButton theme={theme} onClick={handleConfirmAdd}>
              Add
            </ModalButton>
            <CancelButton
              theme={theme}
              onClick={() => setModalAddVisible(false)}
            >
              Cancel
            </CancelButton>
          </div>
        </ModalContent>
      </ModalOverlay>
    </Section>
  );
};

export default Home;
