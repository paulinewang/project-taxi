import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px 40px;
  border: 3px solid ${({ theme }) => theme.colors.green};
  box-shadow: -0.5rem 0.5rem ${({ theme }) => theme.colors.green};
`;

const Title = styled.h1`
  text-transform: uppercase;
`;

const OngoingGame = () => {
  return (
    <Wrapper>
      <Title>Ongoing game</Title>
      <p>Youhou, 1/2 players have accepted your request!</p>

      <div>
        <h2>Links</h2>
        <a href="https://meet.google.com/uys-dbiq-nfm" target="blank">
          Google Meet
        </a>
        <br />

        <a href="https://virtualvacation.us/private-room" target="blank">
          City Guessr
        </a>
      </div>
    </Wrapper>
  );
};

export default OngoingGame;
