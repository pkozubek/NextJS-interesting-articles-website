import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import ToastMessage from "../components/Toast";
import { ToastType } from "../types/toast";
import { getEndpointUrl } from "../utils/dataFetching";
import { signIn, useSession } from "next-auth/react";
import { isEmailValid } from "../utils/auth";
import { useRouter } from "next/router";

function Authentication() {
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const { replace } = useRouter();
  const { status } = useSession();

  if (status === "loading") return null;
  if (status === "authenticated") replace("/");

  const onEmailChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  };

  const onPasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value);
  };

  const toggleMode = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    setLogin((val) => !val);
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (isLogin) {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      }).then((resp) => {
        if (!resp?.error) {
          ToastMessage({
            message: "Logged",
            type: ToastType.SUCCESS,
          });

          push("/");
        } else {
          ToastMessage({
            message: resp.error,
            type: ToastType.ERROR,
          });
        }
      });
    } else {
      fetch(`${getEndpointUrl()}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((resp) => resp.json())
        .then((respJson) =>
          ToastMessage({
            message: respJson.message,
            type: respJson.isOk ? ToastType.SUCCESS : ToastType.ERROR,
          })
        )
        .catch(() => {
          ToastMessage({
            message: "Something went wrong",
            type: ToastType.ERROR,
          });
        });
    }
  };

  const isValidEmailAndPassword = !!email && isEmailValid(email) && !!password;

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {isLogin ? "Log in " : "Sign in"} into nextJS articles
        </h2>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={email}
                onChange={onEmailChange}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={password}
                onChange={onPasswordChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="rounded-md ">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2"
              disabled={!isValidEmailAndPassword}
            >
              {isLogin ? "Log in" : "Sign in"}
            </button>
            <button
              onClick={toggleMode}
              type="submit"
              className="group relative border flex w-full justify-center rounded-md border border-sky-700 text-sky-700 py-2 px-4 text-sm font-medium hover:text-sky-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLogin ? "Switch to Sign up" : "Switch to Log in"}
            </button>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-sky-700 hover:text-sky-800"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
