import styled from "styled-components";
import img from "assets/main.jpg";

export const MainStyles = styled.main`
  position: relative;
  background-image: url(${img});
  background-size: cover;
  color: white;
  text-align: center;
  height: 826px;
  padding-top: 100px;
`;

export const Title = styled.h2`
  font-size: 70px;
  font-family: "Seymour One";
  -webkit-text-stroke: 2px #825534;
`;

export const SubTitle = styled.span`
  font-size: 20px;
  font-family: "Seymour One";
  background-color: #765c45;
  padding: 5px;
`;

export const BtnTitle = styled.p`
  margin: 0;
  font-size: 20px;
  color: #825534;
`;
