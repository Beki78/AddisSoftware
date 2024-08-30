/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import darkbg from "../../assets/blurry-gradient-haikei (1).png";
import lightbg from "../../assets/blurry-gradient-haikei (1).png";
import { GrChapterNext } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";

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

  /* background-image: url(${({ theme }) =>
    theme === "dark" ? darkbg : lightbg});
  background-size: cover;
  background-position: center; */
`;

const Card = styled.div<{ theme: "light" | "dark" }>`
  width: 100%;
  max-width: 28rem;
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
  top: 1rem;
  right: 10rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#374151")};
  transition: color 0.3s ease;


`;
const PlayButtos = styled.div`
  display: flex;
  gap: 4rem;
  width: 100%;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0.6rem 0;
  cursor: pointer;
`;

const Home = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Section theme={theme}>
      <ToggleButton theme={theme} onClick={handleToggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </ToggleButton>

      <Card theme={theme}>
        <div className="flex flex-col justify-center items-center">
          <Image src="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/37/f0/d537f0d1-5cfd-ce67-d7ac-0c4151f63f70/23UMGIM17915.rgb.jpg/1200x1200bb.jpg" />
          <Title>I ain't worried</Title>
          <Name>One Republic</Name>
        </div>
        <PlayButtos>
          <GrChapterPrevious />
          <GrChapterNext />
        </PlayButtos>
      </Card>
    </Section>
  );
};

export default Home;
