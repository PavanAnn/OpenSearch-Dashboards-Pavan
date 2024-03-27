import styled from 'styled-components';

export const CardsContainer = styled.div<{ open?: boolean }>`
  margin: 20px 52px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  > div {
    flex: 1 1 50%;
  }
`;

export const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 16px;
  /* max-width: 30%; */
  cursor: pointer;
  transition: all 200ms ease 0s;
  &:hover {
    border-color: #837ff6;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
  }
  margin: 10px;
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 30px;
  padding: 40px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  color: #837ff6;
`;

export const CardDescription = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  color: #808080;
`;
