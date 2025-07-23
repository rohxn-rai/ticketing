import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { FaCircleInfo } from "react-icons/fa6";

const ErrorAlert = ({ errors, message }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <Alert variant="destructive" className="my-4">
      <FaCircleInfo />
      <AlertTitle>{message}</AlertTitle>
      <AlertDescription>
        <ul className="my-0">
          {errors.map((err, idx) => (
            <li key={idx}>{err.message}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
