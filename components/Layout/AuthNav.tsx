import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

function AuthNav() {
  const { status } = useSession();

  if (status === "loading") return null;

  if (status === "authenticated")
    return (
      <button
        onClick={() =>
          signOut({
            redirect: false,
          })
        }
      >
        Log out
      </button>
    );

  return (
    <li className="nav-item hover:text-sky-700">
      <Link href="/authentication">Log in</Link>
    </li>
  );
}

export default AuthNav;
