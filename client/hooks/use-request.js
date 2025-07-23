import axios from "axios";
import { useState } from "react";

import ErrorAlert from "@/components/common/errorAlert";

const useRequest = ({ url, method, body, message, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);

      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <ErrorAlert errors={err.response.data.errors} message={message} />
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
