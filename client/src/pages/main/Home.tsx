/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";

// Modal components
const ModalOverlay = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div<{ theme: "light" | "dark" }>`
  background: ${({ theme }) => (theme === "dark" ? "#1f2937" : "#ffffff")};
  color: ${({ theme }) => (theme === "dark" ? "#f9fafb" : "#1f2937")};
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0px 4px 6px rgba(255, 255, 255, 0.644)"
      : "0px 4px 6px rgba(0, 0, 0, 0.1)"};
`;

const ModalButton = styled.button<{ theme: "light" | "dark" }>`
  background-color: ${({ theme }) =>
    theme === "dark" ? "#e11d48" : "#f87171"};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#ffffff")};
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#be123c" : "#f43f5e"};
  }
`;
const EditButtonComp = styled.button<{ theme: "light" | "dark" }>`
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1d4ed8" : "#1d4ed8"};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#ffffff")};
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#071e5c" : "#4c6ecb"};
  }
`;

const CancelButton = styled.button<{ theme: "light" | "dark" }>`
  background-color: ${({ theme }) =>
    theme === "dark" ? "#4b5563" : "#e5e7eb"};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#1f2937")};
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#6b7280" : "#d1d5db"};
  }
`;

const Section = styled.section<{ theme: "light" | "dark" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1f2937" : "#ffffff"};
  color: ${({ theme }) => (theme === "dark" ? "#f9fafb" : "#1f2937")};
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow: hidden;
`;

const Card = styled.div<{ theme: "light" | "dark" }>`
  width: 100%;
  max-width: 28rem;
  margin-top: 2rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1f2937" : "#ffffff"};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0px 4px 6px rgba(255, 255, 255, 0.644)"
      : "0px 4px 6px rgba(0, 0, 0, 0.1)"};
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#374151" : "#e5e7eb")};
  padding: 1rem;
  text-align: center;
`;

const Image = styled.img`
  border-radius: 0.5rem;
  width: 100%;
`;

const Button = styled.button<{ theme: "light" | "dark" }>`
  background-color: ${({ theme }) =>
    theme === "dark" ? "#2563eb" : "#1f2937"};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#f9fafb")};
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#1d4ed8" : "#374151"};
  }
`;

const Title = styled.p`
  font-weight: 900;
`;

const Name = styled.p`
  font-weight: 300;
`;

const ToggleButton = styled.button<{ theme: "light" | "dark" }>`
  position: absolute;
  top: 0.7rem;
  right: 10rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#374151")};
  transition: color 0.3s ease;
`;

const Icons = styled.div`
  display: flex;
  justify-content: end;
  font-size: 1.3rem;
  gap: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const PlayButtons = styled.div`
  display: flex;
  gap: 4rem;
  width: 100%;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0.6rem 0;
  cursor: pointer;
`;

const OuterButton = styled.div`
  margin: 1rem auto;
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  width: 25%;
  cursor: pointer;
`;

const OterButtonSingle = css`
  transition: all 300ms ease-in-out;
  &:hover {
    transform: scale(1.3);
    color: #4a4abd;
  }
`;

const DeleteButton = css`
  color: #c31313;
  transition: all 300ms ease-in-out;
  &:hover {
    transform: scale(1.3);
    color: #fb4b4b;
  }
`;

const EditButton = css`
  color: #2d2d9b;
  transition: all 300ms ease-in-out;
  &:hover {
    transform: scale(1.3);
    color: #5e5eb6;
  }
`;
const InputWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const InputLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: start;
  color: ${({ theme }) =>
    theme === "dark" ? "#9ca3af" : "#4b5563"}; /* Label color */
`;

const InputField = styled.input<{ theme: "light" | "dark" }>`
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#374151" : "#e5e7eb")}; /* Input border color */
  background-color: ${({ theme }) =>
    theme === "dark" ? "#111827" : "#f9fafb"}; /* Input background color */
  color: ${({ theme }) =>
    theme === "dark" ? "#f9fafb" : "#1f2937"}; /* Input text color */
  font-size: 1rem;
  transition: border-color 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) =>
      theme === "dark" ? "#2563eb" : "#2563eb"}; /* Focus border color */
  }
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
  color: ${({ theme }) =>
    theme === "dark" ? "#9ca3af" : "#4b5563"}; /* File input text color */
`;

const Home = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

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
          <Title>I ain't worried</Title>
          <Name>One Republic</Name>
        </div>
        <PlayButtons>
          <GrChapterPrevious css={OterButtonSingle} />
          <GrChapterNext css={OterButtonSingle} />
        </PlayButtons>
      </Card>
      <OuterButton>
        <MdFavorite css={OterButtonSingle} />
        <IoAddCircleOutline css={OterButtonSingle} />
        <RiPlayListFill css={OterButtonSingle} />
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
    </Section>
  );
};

export default Home;
