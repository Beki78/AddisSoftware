import styled from "@emotion/styled";
import { css } from "@emotion/react";

// Modal components
export const ModalOverlay = styled.div<{ visible: boolean }>`
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

export const ModalContent = styled.div<{ theme: "light" | "dark" }>`
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

export const ModalButton = styled.button<{ theme: "light" | "dark" }>`
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
export const EditButtonComp = styled.button<{ theme: "light" | "dark" }>`
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

export const CancelButton = styled.button<{ theme: "light" | "dark" }>`
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

export const Section = styled.section<{ theme: "light" | "dark" }>`
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

export const Card = styled.div<{ theme: "light" | "dark" }>`
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

export const Image = styled.img`
  border-radius: 0.5rem;
  width: 100%;
`;

// export const Button = styled.button<{ theme: "light" | "dark" }>`
//   background-color: ${({ theme }) =>
//     theme === "dark" ? "#2563eb" : "#1f2937"};
//   color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#f9fafb")};
//   border: none;
//   border-radius: 0.375rem;
//   padding: 0.5rem 1rem;
//   margin: 0.5rem;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: ${({ theme }) =>
//       theme === "dark" ? "#1d4ed8" : "#374151"};
//   }
// `;

export const Title = styled.p`
  font-weight: 900;
`;

export const Name = styled.p`
  font-weight: 300;
`;

export const ToggleButton = styled.button<{ theme: "light" | "dark" }>`
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

export const Icons = styled.div`
  display: flex;
  justify-content: end;
  font-size: 1.3rem;
  gap: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
`;

export const PlayButtons = styled.div`
  display: flex;
  gap: 4rem;
  width: 100%;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0.6rem 0;
  cursor: pointer;
`;

export const OuterButton = styled.div`
  margin: 1rem auto;
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  width: 25%;
  cursor: pointer;
`;

export const OterButtonSingle = css`
  transition: all 300ms ease-in-out;
  &:hover {
    transform: scale(1.3);
    color: #4a4abd;
  }
`;

export const DeleteButton = css`
  color: #c31313;
  transition: all 300ms ease-in-out;
  &:hover {
    transform: scale(1.3);
    color: #fb4b4b;
  }
`;

export const EditButton = css`
  color: #2d2d9b;
  transition: all 300ms ease-in-out;
  &:hover {
    transform: scale(1.3);
    color: #5e5eb6;
  }
`;
export const InputWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const InputLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: start;
  color: ${({ theme }) =>
    theme === "dark" ? "#9ca3af" : "#4b5563"}; /* Label color */
`;

export const InputField = styled.input<{ theme: "light" | "dark" }>`
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

export const FileInput = styled.input`
  margin-bottom: 1rem;
  color: ${({ theme }) =>
    theme === "dark" ? "#9ca3af" : "#4b5563"}; /* File input text color */
`;
export const NotFoundText = styled.p`
  font-size: 1.2rem;
  color: #999;
  text-align: center;
  margin: 20px 0;
  font-weight: 500;
`;