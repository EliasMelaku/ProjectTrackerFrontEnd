import React, { useEffect, useState } from "react";

import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import './css/viewPdf.css'

const ViewPDF = ({report}) => {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    if (report == "noReport"){
      setPdfFile(report)
    }
   else{
      const path = report.substring(88)
      displayPdf(path);
    }
  }, [pdfFile]);

  async function displayPdf(path) {
    // console.log(path)
    let response = await fetch("http://127.0.0.1:8887/" + path);
    let data = await response.blob();
    let metadata = {
      type: "application/pdf",
    };
    let file = new File([data], "report.pdf", metadata);


    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setPdfFile(e.target.result);
    };
  }

  return (
    <div>
      {!pdfFile || pdfFile == "noReport" ? (
        <p className="noReport">This Project Doesn't have a report</p>
      ) : (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
          <div className={"pdfViewer"}>
          <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]}></Viewer>
          </div>
        </Worker>
      )}
    </div>
  );
};

export default ViewPDF;
