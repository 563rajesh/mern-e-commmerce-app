import { Spinner } from "react-bootstrap";

const Loader = () => {
  const style = {
    width: "100px",
    height: "100px",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20vh",
  };
  return (
    <Spinner animation="border" role="status" style={style}>
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
