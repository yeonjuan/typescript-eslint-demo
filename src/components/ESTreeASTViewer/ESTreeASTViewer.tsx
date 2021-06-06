import ReactJson from "react-json-view";

export const ESTreeASTViewer = (ast: any) => {
  return <ReactJson src={ast} />;
};
