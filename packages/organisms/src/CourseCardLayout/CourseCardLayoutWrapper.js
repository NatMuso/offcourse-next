import system from "system-components";

export default system({
  p: 8,
  pr: 0,
  bg: "grayScale.1",
  width: "100%",
  flexDirection: "column",
  overflow: "auto",
  display: "flex"
}).extend`
  box-sizing: border-box
`;
