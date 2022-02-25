import styled from "styled-components";

const Button = styled.button`
  text-transform: uppercase;
  font: Roboto;
  font-weight: bold;
  font-size: 32px;
  padding: 10px 40px;
  background-color: white;
  cursor: pointer;
  border: 3px solid ${({ theme }) => theme.colors.yellow};
  box-shadow: -0.5rem 0.5rem ${({ theme }) => theme.colors.yellow};
`;

const InviteButton = () => {
  return (
    <Button onClick={() => console.log("sending invite")}>Send request</Button>
  );
};

export default InviteButton;
