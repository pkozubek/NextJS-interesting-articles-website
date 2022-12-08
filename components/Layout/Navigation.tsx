import Link from "next/link";
import { GrArticle } from "react-icons/gr";

function Navigation() {
  return (
    <header>
      <nav className="navbar shadow-md py-2 bg-white relative flex w-full justify-between">
        <Link href="/" className="pl-2">
          <div className="flex justify-center align-center">
            <GrArticle />
            <h1>NextJS Articles</h1>
          </div>
        </Link>
        <div className="px-6 w-full flex flex-wrap">
          <ul className="navbar-nav ml-auto flex gap-x-4 text-black">
            <li className="nav-item">
              <Link href="/articles">Articles</Link>
            </li>
            <li className="nav-item">
              <Link href="/articles/add">Add article</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
