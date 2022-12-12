import { useSession } from "next-auth/react";

type ContentGuardProps = {
  children: JSX.Element;
};

function ContentGuard({ children }: ContentGuardProps) {
  const { data, status } = useSession();

  if (status === "authenticated") {
    return children;
  } else return null;
}

export default ContentGuard;
