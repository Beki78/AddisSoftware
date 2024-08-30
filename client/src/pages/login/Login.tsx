/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import background from "../../assets/polygon-scatter-haikei.png";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    filter: blur(6px);
    z-index: -1;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem;
  background-color: #1f2937;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #374151;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: #f9fafb;
  text-align: center;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #f9fafb;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem;
  border-radius: 0.375rem;
  border: 1px solid #374151;
  background-color: #374151;
  color: #f9fafb;
  &::placeholder {
    color: #9ca3af;
  }
  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: #2563eb;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  &:hover {
    background-color: #1d4ed8;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.3);
  }
`;

const Text = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  color: #9ca3af;
  text-align: center;
  margin-top: 1em;
`;

const Link = styled.a`
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
    const navigate = useNavigate()
  return (
    <Section>
      <Card>
        <CardContent>
          <Title>Sign In</Title>
          <Form>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="bereketgetachew@gmail.com"
                // required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                // required
              />
            </div>
            <Button type="submit" onClick={() => navigate("/home")}>Sign In</Button>
          </Form>
          <Text>
            Don't have an account? <Link href="/signup">Create one here</Link>
          </Text>
        </CardContent>
      </Card>
    </Section>
  );
};

export default Login;
