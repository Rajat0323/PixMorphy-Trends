type BlogArticleTableProps = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export function BlogArticleTable({ caption, headers, rows }: BlogArticleTableProps) {
  return (
    <figure className="blog-article-table mt-6">
      <div className="blog-article-table__scroll">
        <table>
          <caption className="sr-only">{caption ?? "Salary comparison table"}</caption>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, cellIndex) => (
                  <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? (
        <figcaption className="blog-article-table__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
