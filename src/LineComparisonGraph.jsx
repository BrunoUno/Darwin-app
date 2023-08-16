import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import AlertMessage from "./AlertMessage";
import jsPDF from "jspdf";
import Chart from "chart.js/auto";

export default function LineComparisonGraph({ status }) {
  const chartRef = useRef(null);
  const chartData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Line 1",
        data: [2, 8, 5, 3, 10],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Line 2",
        data: [1, 5, 7, 2, 9],
        borderColor: "red",
        fill: false,
      },
    ],
  };

  const exportToPDF = () => {
    const input = chartRef.current.canvas;
    html2canvas(input, { scale: 0.7 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div
          style={{
            width: "60%",
            height: "50vh",
            marginTop: "50px",
            border: "1px solid black",
            padding: "20px",
          }}
        >
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
            }}
            ref={chartRef}
          />
        </div>
      </div>
      <div className="pdf-button">
        <button onClick={exportToPDF}>Export to PDF</button>
        {status.msg === "Login Successful!!" ? (
          <AlertMessage key={status.key} message={status.msg} />
        ) : null}
      </div>
    </>
  );
}
