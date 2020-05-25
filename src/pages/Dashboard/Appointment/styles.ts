import styled from 'styled-components';

export const Container = styled.div`
  > p {
    color: #999591;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  & + div {
    margin-top: 16px;
  }
  span {
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;
    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }
  div {
    background: #3e3b47;
    border-radius: 10px;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 16px 24px;
    margin-left: 24px;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;
