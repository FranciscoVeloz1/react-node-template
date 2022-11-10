import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

interface props {
  message: string;
}

const ErrorComponent = ({ message }: props) => {
  return (
    <div className="d-flex flex-column align-items-center title mt-5">
      <FontAwesomeIcon icon={faSync} className="mb-4 icon" />
      Error loading page. {message}
    </div>
  );
};

export default ErrorComponent;
