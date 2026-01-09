export default async function AcademicPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/academic`, {
    cache: "no-store",
  });
  const files = await res.json();

  return (
    <div className="grid gap-4">
      {files.map((f) => (
        <div key={f._id} className="p-4 border rounded">
          <h3>{f.title}</h3>
          <p>{f.subject}</p>
          <a
            href={f.fileUrl}
            target="_blank"
            download
            className="text-blue-600 underline"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}
