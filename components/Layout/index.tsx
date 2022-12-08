import Link from "next/link";
import Navigation from "./Navigation";

type LayoutProps = {
  children: JSX.Element;
};

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}

export default Layout;
