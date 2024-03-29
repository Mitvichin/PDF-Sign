import { ChangeEvent, useState } from "react";
import "./App.css";
import { PDFSigner } from "./PDFSigner/PDFSigner";

function App() {
  const [file, setFile] = useState<File>();

  const handleFileInputChange = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (files) setFile(files[0]);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "1000px",
        }}
      >
        <div
          style={{ marginBottom: "10px", color: "rgba(207, 112, 112, 0.8)" }}
        >
          * In order to place a sign placeholder, please click on one of the
          names and then click 'Place sign', then move the mouse to the desired
          place and click. Repeat for the other names. Position for a sign is
          saved. You can reload the page, open the pdf again and it will display
          them on the correct spot.{" "}
          <a href="https://github.com/Mitvichin/PDF-Sign">Source code</a>
        </div>
      </div>
      <input type="file" onChange={handleFileInputChange} />
      {file && <PDFSigner file={file} />}
    </>
  );
}

export default App;
