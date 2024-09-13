export type Theme = "light" | "dark";


// Styled components
  const PlaylistContainer = styled.div<{ theme: Theme }>`
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

  const PlaylistTitle = styled.h2`
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
  const CancelButton = styled(ModalButton)`
    background-color: ${({ theme }) =>
      theme === "dark" ? "#6b7280" : "#9ca3af"};

    &:hover {
      background-color: ${({ theme }) =>
        theme === "dark" ? "#4b5563" : "#6b7280"};
    }
  `;
  const Icons = styled.div`
    display: flex;
    justify-content: end;
    font-size: 1.3rem;
    gap: 1rem;
    margin: 0.5rem 0;
    cursor: pointer;
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

  const SongImage = styled.img`
    width: 4rem;
    border-radius: 30%;
  `;
  const SongText = styled.div`
      display: flex;
      flex-direction: column;
  `