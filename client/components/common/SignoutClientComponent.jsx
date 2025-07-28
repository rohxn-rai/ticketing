"use client";

import { useEffect } from "react";
import useRequest from "@/hooks/use-request";
import { replacePath } from "@/actions/replacePath";

const SignoutClientComponent = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => replacePath("/", "push"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <h1 className="text-2xl">Signing you out...</h1>;
};

export default SignoutClientComponent;
