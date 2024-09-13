/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CancelButton, Card, DeleteButton, EditButton, EditButtonComp, FileInput, Icons, Image, InputField, InputLabel, InputWrapper, ModalButton, ModalContent, ModalOverlay, Name, OterButtonSingle, OuterButton, PlayButtons, Section, Title, ToggleButton } from "./HomeStyle";
import { fetchMusic } from "../../api/musicApi";

const Home = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleDeleteClick = () => {
    setModalVisible(true);
  };
  const handleEditClick = () => {
    setModalEditVisible(true);
  }; 
  const getData = async () => {
    const data = await fetchMusic(); 
    return data
  };
  const handleAddClick = () => {
    setModalAddVisible(true);
    getData()
    
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
      setModalAddVisible(false)
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", BackClicked);
    return () => {
      document.removeEventListener("mousedown", BackClicked);
    };
  }, []);

  const toFavorite = useNavigate();
  // const toAdd = useNavigate()
  // const toPlaylist = useNavigate()

  return (
    <Section theme={theme}>
      <ToggleButton theme={theme} onClick={handleToggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </ToggleButton>

      <Card theme={theme}>
        <Icons>
          <FaPen css={EditButton} onClick={handleEditClick} />
          <MdDelete css={DeleteButton} onClick={handleDeleteClick} />
        </Icons>
        <div className="flex flex-col justify-center items-center">
          <Image src="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/37/f0/d537f0d1-5cfd-ce67-d7ac-0c4151f63f70/23UMGIM17915.rgb.jpg/1200x1200bb.jpg" />
          <Title>Hello</Title>
          <Name>One Republic</Name>
        </div>
        <PlayButtons>
          <GrChapterPrevious css={OterButtonSingle} />
          <GrChapterNext css={OterButtonSingle} />
        </PlayButtons>
      </Card>
      <OuterButton>
        <MdFavorite
          css={OterButtonSingle}
          onClick={() => toFavorite("/favorite")}
        />
        <IoAddCircleOutline css={OterButtonSingle} onClick={handleAddClick} />
        <RiPlayListFill
          css={OterButtonSingle}
          onClick={() => toFavorite("/playlist")}
        />
      </OuterButton>

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
            <FileInput type="file" />
            <div>
              <InputLabel htmlFor="title">Title</InputLabel>
              <br />
              <InputField
                type="text"
                placeholder="Music title"
                id="title"
                theme={theme}
              />
            </div>
            <div>
              <InputLabel htmlFor="artist">Artist</InputLabel>
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
      <ModalOverlay visible={modalAddVisible}>
        <ModalContent theme={theme} ref={modalRef}>
          <h2>Add Music</h2>
          <InputWrapper>
            <FileInput type="file" />
            <div>
              <InputLabel htmlFor="title">Title</InputLabel>
              <br />
              <InputField
                type="text"
                placeholder="Music title"
                id="title"
                theme={theme}
              />
            </div>
            <div>
              <InputLabel htmlFor="artist">Artist</InputLabel>
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
              Add
            </EditButtonComp>
            <CancelButton theme={theme} onClick={handleCloseEditModal}>
              Cancel
            </CancelButton>
          </div>
        </ModalContent>
      </ModalOverlay>
    </Section>
  );
};

export default Home;
