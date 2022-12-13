import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type RedirectGuardProps = {
  redirectUrl: string;
  children: JSX.Element;
};

function RedirectGuard({ redirectUrl, children }: RedirectGuardProps) {
  const { status } = useSession();
  const { replace } = useRouter();

  if (status === "unauthenticated") {
    replace(redirectUrl);
  }

  if (status === "loading") return null;

  return children;
}

export default RedirectGuard;
