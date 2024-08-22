type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <h1 css={{ color: "var(--text-100)", padding: ".5rem 0" }}>{children}</h1>
  );
}
