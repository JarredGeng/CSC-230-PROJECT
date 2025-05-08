import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase config
const supabase = createClient(
  "https://bhxdgoozvtfutxroypnj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoeGRnb296dnRmdXR4cm95cG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTQ2NDIsImV4cCI6MjA1OTg3MDY0Mn0.0KwGrSNYhweaghpvANNDkn0vlvNMFae1b1ClQoKLRVQ"
);

const PosterEditor = ({ fileUrl, onSave }) => {
  const viewerRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!fileUrl || initialized.current) return;
    initialized.current = true;

    console.log("PosterEditor: initializing WebViewer");

    WebViewer(
      {
        path: "/webviewer",
        initialDoc: fileUrl,
        fullAPI: true,
        licenseKey: "demo:1746689555194:611035ae03000000005ff8f81913a7e1421c37f7d33fa8060aa7a9bd6a"
      },
      viewerRef.current
    ).then((instance) => {
      const { documentViewer, annotationManager } = instance.Core;

      instance.UI.disableElements(["toolsHeader"]);

      const observer = new MutationObserver(() => {
        const bottomToolbar = viewerRef.current.querySelector('[class*="ToolsOverlay"]');
        if (bottomToolbar) bottomToolbar.style.display = 'none';
      });

      observer.observe(viewerRef.current, { childList: true, subtree: true });

      window.saveAnnotatedPDF = async () => {
        try {
          const xfdf = await annotationManager.exportAnnotations();
          console.log("XFDF exported:", xfdf);

          const doc = documentViewer.getDocument();
          const data = await doc.getFileData({ xfdfString: xfdf });
          console.log("File data generated:", data?.byteLength);

          const blob = new Blob([data], { type: "application/pdf" });
          console.log("Blob size:", blob.size);

          // ✅ Clean filename to remove problematic characters
          let fileName = fileUrl.split("/").pop() || `annotated_${Date.now()}.pdf`;
          fileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");

          if (blob.size === 0) {
            alert("PDF is empty — save failed.");
            return;
          }

          const { error } = await supabase.storage
            .from("uploads")
            .upload(fileName, blob, {
              upsert: true,
              contentType: "application/pdf",
            });

          if (error) {
            console.error("Supabase upload failed:", error.message, error);
            alert("Upload failed: " + error.message);
          } else {
            onSave?.();
            alert("Annotated PDF saved.");
          }
        } catch (err) {
          console.error("Save error:", err);
          alert("Failed to save annotations.");
        }
      };
    });
  }, [fileUrl, onSave]);

  return (
    <div>
      <div ref={viewerRef} style={{ height: "90vh", width: "100%" }} />
      <button onClick={() => window.saveAnnotatedPDF()} style={{ marginTop: "1rem" }}>
        Save Annotations & Send to Student
      </button>
    </div>
  );
};

export default PosterEditor;
