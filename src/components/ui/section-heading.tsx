type SectionHeadingProps = {
  title: string;
  className?: string;
  id?: string;
};

export function SectionHeading({
  title,
  className = "",
  id,
}: SectionHeadingProps) {
  return (
    <h2 className={`section-heading ${className}`} id={id}>
      {`</ ${title}>`}
    </h2>
  );
}
