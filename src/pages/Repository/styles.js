import styled from 'styled-components';

export const NavigationHeader = styled.div`
  position: relative;

  div {
    display: flex;
    align-items: center;
    a {
      color: #7951c1;
      font-size: 14px;
      text-decoration: none;
    }
  }
  small {
    position: absolute;
    top: -55px;
    left: 90%;
    margin: 0 35px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 50%;

    svg {
      margin: 20px;
    }
  }
`;

export const RepoInfo = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 95px;
    border-radius: 50%;
    margin-top: 20px;
  }
`;

export const RepoDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 24px;
    margin-top: 20px;
  }

  div {
    display: inline-flex;
    margin: 20px 0 0 0;
    small {
      display: flex;
      align-items: center;
      background: #f7f7f7;
      padding: 5px 30px 5px 30px;
      margin: 0 20px 0 20px;

      svg {
        margin: 0 10px 0 0;
      }
    }
  }

  p {
    margin-top: 30px;
    font-size: 14px;
    color: #666;
    text-align: center;
    max-width: 400px;
  }
`;

export const FilterTab = styled.div`
  margin: 30px 0 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterButton = styled.button.attrs(props => ({
  type: 'button',
}))`
  background: #f7f7f7;
  color: #000;
  font-weight: 600;
  border: none;
  border-bottom: 2px solid #fff;
  padding: 15px 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-color: ${props => props.filterActive && '#5d44b5'};

  svg {
    margin: 0 15px 0 0;
  }
`;

export const IssueList = styled.div`
  margin-top: 10px;
  list-style: none;

  li {
    display: flex;
    border: 1px solid #eee;
    border-radius: 4px;
    margin: 10px;
  }

  li:hover {
    cursor: pointer;
    box-shadow: 0px 6px 10px #d4d4d4;
  }

  & + li {
    margin-top: 10px;
  }

  a {
    display: flex;
    padding: 15px 10px;
    text-decoration: none;
    color: #333;

    &:hover {
      color: #7159c1;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border: 2px solid #eee;
    border-radius: 50%;
  }

  div {
    flex: 1;
    margin-left: 16px;

    strong {
      font-size: 16px;

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const Pagination = styled.div`
  max-width: 700px;
  background: #f7f7f7;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  margin: 15px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PaginationButton = styled.button.attrs(props => ({
  type: 'button',
}))`
  background: #f7f7f7;
  font-weight: 600;
  border: 4px;
  padding: 15px 30px;
  border-radius: 0px;

  cursor: ${props => props.allowed && 'not-allowed'};

  &:hover {
    background: #eae8e8;
    transition: 0.2s;
  }
`;
