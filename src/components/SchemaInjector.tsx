import { Schema } from "@/lib/types";

export default function SchemaInjector({
  schemas,
}: {
  schemas?: Schema | Schema[];
}) {
  if (!schemas) return null;

  const normalizedSchemas = Array.isArray(schemas) ? schemas : [schemas];

  return (
    <>
      {normalizedSchemas.map((schema, i) => {
        const json = schema.schema_json ?? schema;
        if (!json) return null;
        const uniqueId = crypto.randomUUID();
        return (
          <script
            key={uniqueId}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(json).replace(/</g, "\\u003c"),
            }}
          />
        );
      })}
    </>
  );
}
