import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p>The Page was not found</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
