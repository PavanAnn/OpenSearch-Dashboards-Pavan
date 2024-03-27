import styled from 'styled-components';

export const CardNotification = styled.div`
  width: 89%;
  margin-left: 65px;
  padding: 24px 24px 16px 24px;
  border-radius: 16px;
  border: 1px solid #0865ce;
  background-color: #ffffff;

  @media (max-width: 768px) {
    width: 82%;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 24px;

  .left-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .right-content {
    cursor: pointer;
    margin-left: auto;
  }
`;

export const Title = styled.div`
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  padding-left: 16px;
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;

  p {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: 0.42px;
    color: #808080;

    b {
      font-weight: 550;
      text-transform: uppercase;
    }
  }

  @media (min-width: 768px) {
    p {
      max-width: 75%;
    }
  }
`;

export const ButtonLink = styled.button`
  padding: 10px 24px 10px 24px;
  border-radius: 100px;
  border: 1px solid #837ff6;
  color: #837ff6;
`;
