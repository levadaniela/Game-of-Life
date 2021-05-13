import styled from "styled-components";
interface CellsProps{
  live: boolean
}
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 20px);
`;

export const Cells = styled.div <CellsProps>`
 width: 20px;
  height: 20px;
  border: solid 1px black;
  background-color: ${(props) => (props.live ? "turquoise" : "white")}; 
`;