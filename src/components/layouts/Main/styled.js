import styled from "styled-components";
import img from "assets/main.jpg";

export const MainStyles = styled.main`
  position: relative;
  background-image: url(${img});
  background-size: cover;
  height: 826px;
  color: white;
  text-align: center;
  padding-top: 150px;
`;

export const Title = styled.h2`
  font-size: 70px;
  font-family: "Seymour One";
  -webkit-text-stroke: 2px #825534;
`;

export const SubTitle = styled.p`
  font-size: 30px;
  -webkit-text-stroke: 1px #825534;
  margin-bottom: 50px;
`;

export const BtnTitle = styled.p`
  margin: 0;
  font-size: 20px;
  color: #825534;
`;
