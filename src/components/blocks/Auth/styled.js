import styled from "styled-components";
import img from "assets/main.jpg";

export const MainStyles = styled.div`
  position: relative;
  background-image: url(${img});
  background-size: cover;
  height: 826px;
  color: white;
  text-align: center;
  padding-top: 150px;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
`;

export const AuthStyles = styled.div`
  position: relative;
  border: 2px solid #f1f1f1;
  z-index: 5;
  padding: 25px;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  align-items: center;
`;

export const InputStyles = styled.input`
  margin-bottom: 15px;
`;
