import axios from "axios";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { FaCircleInfo } from "react-icons/fa6";

const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      setErrors(
        <Alert variant="destructive">
          <FaCircleInfo />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            <ul className="my-0">
              {err.response.data.errors.map((err, index) => (
                <li key={index}>{err.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
