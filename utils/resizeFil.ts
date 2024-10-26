import Resizer from "react-image-file-resizer";

const resizeFile = (file: File): Promise<string> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "base64"
    );
  });

export default resizeFile;
