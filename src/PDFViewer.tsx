import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const PDFViwer: React.FC<{ file: File }> = ({ file }) => {
  return (
    <Document file={file}>
      <Page pageIndex={0} renderTextLayer={false} width={1000}></Page>
    </Document>
  );
};
