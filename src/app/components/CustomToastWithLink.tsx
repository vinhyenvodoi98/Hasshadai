import Link from "next/link";

export default function CustomToastWithLink (tx:`0x${string}`) {
  return (
  <div>
    <p>Transaction has been created successfully:</p>
    <Link target="_blank" href={`https://opencampus-codex.blockscout.com/tx/${tx}`}>Details</Link>
  </div>
  );
}