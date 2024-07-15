import { Editor } from "@tinymce/tinymce-react";
import uploadVideo from "../firebase_video/video";
import uploadImage from "../firebase_image/image";
import { Callback, Meta } from "../../types/contentType";

interface Props {
  value?: string;
  OnChangeEditor: (e: string) => void;
  height: number;
}
const TextEditor = ({ value, OnChangeEditor, height }: Props) => {
  console.log(value, "<<updaetProduct?>>");
  //   const imageHandler = () => {
  //     const input = document.createElement("input");
  //     input.setAttribute("type", "file");
  //     input.setAttribute("accept", "image/*");
  //     input.onchange = function () {
  //       const file = this.files?.[0];
  //       if (file) {
  //         const reader = new FileReader();
  //         reader.onload = function () {
  //           const blobCache = window?.tinymce.activeEditor.editorUpload.blobCache;
  //           const base64 = reader.result?.toString().split(",")[1];
  //           const blobInfo = blobCache.create(file.name, file, base64);
  //           blobCache.add(blobInfo);
  //           window?.tinymce.activeEditor.insertContent(
  //             `<img src="${blobInfo.blobUri()}" alt="${file.name}" />`
  //           );
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     };
  //     input.click();
  //   };
  //   const videoHandler = () => {
  //     const input = document.createElement("input");
  //     input.setAttribute("type", "file");
  //     input.setAttribute("accept", "video/*");
  //     input.onchange = function () {
  //       const file = this?.files?.[0];
  //       if (file) {
  //         const reader = new FileReader();
  //         reader.onload = function () {
  //           window?.tinymce?.activeEditor.insertContent(
  //             `<video controls src="${reader.result}" title="${file.name}"></video>`
  //           );
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     };
  //     input.click();
  //   };
  //   return (
  //     <Editor
  //       apiKey="gi18c6jyss0dc5qrkzphskd1nhectf41k2lbv9pr2qt5pgxl"
  //       init={{
  //         width: 600,
  //         height: 300,
  //         menubar: "favs file edit view insert format tools table help",
  //         plugins: [
  //           "advlist",
  //           "autolink",
  //           "lists",
  //           "link",
  //           "image",
  //           "charmap",
  //           "preview",
  //           "anchor",
  //           "searchreplace",
  //           "visualblocks",
  //           "code",
  //           "fullscreen",
  //           "insertdatetime",
  //           "media",
  //           "table",
  //           "code",
  //           "help",
  //           "wordcount",
  //         ],
  //         // plugins:
  //         //   "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
  //         toolbar:
  //           "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",

  //         file_picker_callback: (callback, value, meta) => {
  //           if (meta.filetype === "image") {
  //             imageHandler();
  //           } else if (meta.filetype === "media") {
  //             videoHandler();
  //           }
  //         },
  //         // tinycomments_mode: "embedded",
  //         // tinycomments_author: "Author name",
  //         // mergetags_list: [
  //         //   { value: "First.Name", title: "First Name" },
  //         //   { value: "Email", title: "Email" },
  //         // ],
  //         // ai_request: (request, respondWith) =>
  //         //   respondWith.string(() =>
  //         //     Promise.reject("See docs to implement AI Assistant")
  //         //   ),
  //       }}
  //       initialValue="Welcome to TinyMCE!"
  //     />
  //   );

  const imageHandler = (callback: Callback) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const fileName = file.name;

        try {
          const imageUrl = await uploadImage(fileName, file, (progress) => {
            console.log("Upload progress:", progress);
          });

          if (imageUrl) {
            callback(imageUrl, { title: fileName });
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };
    input.click();
  };

  const videoHandler = (callback: Callback) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.addEventListener("change", async function (event) {
      const file = (event.target as HTMLInputElement).files?.[0]; // Cast event.target to HTMLInputElement
      if (file) {
        const fileName = file.name;

        try {
          const videoUrl = await uploadVideo(fileName, file, (progress) => {
            console.log("Upload progress:", progress);
          });

          if (videoUrl) {
            callback(videoUrl, { title: fileName });
          }
        } catch (error) {
          console.error("Video upload failed:", error);
        }
      }
    });
    input.click();
  };

  return (
    <div className="editor-container">
      <Editor
        // initialValue={""}
        apiKey="gi18c6jyss0dc5qrkzphskd1nhectf41k2lbv9pr2qt5pgxl"
        init={{
          //   width: 600,
          height: height,
          skin: "oxide-dark",
          content_css: "dark",
          //   theme: "dark",
          //   content_css: "dark",
          menubar: "favs file edit view insert format tools table help",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          file_picker_callback: (callback: Callback, _: string, meta: Meta) => {
            console.log(meta, callback, "from textEdito");
            if (meta?.filetype === "image") {
              imageHandler(callback);
            } else if (meta?.filetype === "media") {
              videoHandler(callback);
            }
          },
          initialValue: "Welcome to TinyMCE!",
        }}
        value={value}
        onEditorChange={(content: string) => OnChangeEditor(content)}
      />
    </div>
  );
};

export default TextEditor;
