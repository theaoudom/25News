/**
 * Renders one or more JSON-LD structured-data blocks. Server component — the
 * payload is serialised at build/request time, never on the client.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data is trusted, server-generated content.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
