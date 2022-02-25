import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px 40px;
  border: 3px solid ${({ theme }) => theme.colors.green};
  box-shadow: -0.5rem 0.5rem ${({ theme }) => theme.colors.green};
`;

const OngoingGame = () => {
  return (
    <Wrapper>
      <h1>Ongoing game</h1>
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
