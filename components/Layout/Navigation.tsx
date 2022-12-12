import Link from "next/link";
import { GrArticle } from "react-icons/gr";
import AuthNav from "./AuthNav";

function Navigation() {
  return (
    <header>
      <nav className="navbar shadow-md py-2 bg-white relative flex w-full justify-between">
        <Link href="/" className="pl-2">
          <div className="flex justify-content-center items-center ">
            <GrArticle className="px-1" size={30} />
            <h1>NextJS Articles</h1>
          </div>
        </Link>
        <div className="px-6 flex flex-wrap">
          <ul className="navbar-nav ml-auto flex items-center gap-x-4 text-black">
            <li className="nav-item hover:text-sky-700">
              <Link href="/articles">Articles</Link>
            </li>
            <li className="nav-item hover:text-sky-700">
              <Link href="/articles/add">Add article</Link>
            </li>
            <AuthNav />
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
