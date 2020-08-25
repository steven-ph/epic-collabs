import Link from 'next/link';

const LinkComponent = ({ href, as, children, ...rest }) => (
  <Link href={href} as={as || href}>
    <a {...rest}>{children}</a>
  </Link>
);

export { LinkComponent as Link };
