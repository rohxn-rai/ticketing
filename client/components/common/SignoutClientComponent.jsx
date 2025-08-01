"use client";

import { useEffect } from "react";
import useRequest from "@/hooks/use-request";
import replacePath from "@/actions/replacePath";
import { toast } from "sonner";

const SignoutClientComponent = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => replacePath("/", "replace", true),
  });

  useEffect(() => {
    toast.promise(doRequest(), {
      loading: "Loading...",
      success: "You are successfully signed out",
      error: "Something went wrong",
    });
  }, []);

  return <h1 className="text-2xl">Signing you out...</h1>;
};

export default SignoutClientComponent;
