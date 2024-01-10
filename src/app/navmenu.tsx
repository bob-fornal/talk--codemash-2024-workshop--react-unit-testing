import Link from 'next/link';

export default function NavMenu() {
  return (
    <div data-testid={"nav-menu"}>
      <Link data-testid={"nav-home"} href="/">Home</Link>
      <Link data-testid={"nav-some-page"} href="/some-page" target="_blank">Some Page</Link>
    </div>
);
}
