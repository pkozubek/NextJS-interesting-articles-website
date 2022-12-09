import Link from "next/link";
import Navigation from "./Navigation";

type LayoutProps = {
  children: JSX.Element;
};

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navigation />
      <main className="container mx-auto mt-4">{children}</main>
      <footer></footer>
    </div>
  );
}

export default Layout;
