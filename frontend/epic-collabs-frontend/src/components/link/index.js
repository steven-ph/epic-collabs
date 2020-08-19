import Link from 'next/link';

const LinkAs = ({ href, as, children, ...rest }) => (
  <Link href={href} as={as || href}>
    <a {...rest}>{children}</a>
  </Link>
);

export { LinkAs as Link };
