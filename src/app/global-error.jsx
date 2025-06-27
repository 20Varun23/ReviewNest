"use client";

export default function ErrorBoundary(err) {
  return (
    <html>
      <body>
        <h1>{err.message}</h1>
        <h1>{err.statusCode}</h1>
      </body>
    </html>
  );
}
