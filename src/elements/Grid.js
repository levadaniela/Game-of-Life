import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-template-columns: repeat(10, 20px);
 width: 20px;
  height: 20px;
  border: solid 1px black;
  background-color: ${(props) => (props.true ? "turquoise" : "white")}; */
`;
