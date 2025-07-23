"use client";

import { useState } from "react";
import { replacePath } from "@/actions/redirect";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useRequest from "@/hooks/use-request";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    message: "Unable to signup at the moment!",
    onSuccess: () => replacePath("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    doRequest();

    setLoading(false);
  };

  return (
    <div className="container flex mx-auto pt-24 pb-12">
      <div className="max-w-2xl w-full mx-auto">
        <form className="mx-6" onSubmit={onSubmit}>
          <h1 className="text-center text-4xl">Sign up</h1>

          {errors}

          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email Address</label>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
              />
            </div>

            <Button size="lg" type="submit" disabled={loading}>
              {loading ? "Signing up…" : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
