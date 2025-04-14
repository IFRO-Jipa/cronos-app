import {
  createElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { DEFAULT_TARGET_SCALE } from "../../../Features/DEFAULT_TARGET_SCALE";
import { getSVGDataForTable } from "../../../Features/getSVGDataForTable";
import { IReportTableData } from "../../ReportTable/interfaces/IReportTableData";
import ReportTable from "../../ReportTable/ReportTable";

export const useWeekItemViewOverviewState = (
  reportTableData: IReportTableData,
) => {
  const [imgURL, setImgURL] = useState("");

  const outputElRef = useRef<HTMLDivElement>(null);

  const generateImageBlob = useCallback(async () => {
    const outputEl = outputElRef.current!;

    if (!outputEl) {
      return null;
    }

    const rootEl = document.createElement("div");
    outputEl.appendChild(rootEl);

    const root = createRoot(rootEl);

    await new Promise<string>((resolve) => {
      root.render(
        <>
          {createElement(() => {
            useLayoutEffect(() => {
              resolve(outputEl.innerHTML);
            }, []);
            return null;
          })}
          <ReportTable data={reportTableData} />
        </>,
      );
    });

    const svgData = getSVGDataForTable(
      rootEl.querySelector("table")!,
      rootEl.querySelector("style")!,
    );

    const svgURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      svgData,
    )}`;

    const img = new Image();

    await new Promise((resolve, reject) => {
      img.addEventListener("load", resolve);
      img.addEventListener("error", reject);
      img.src = svgURL;
    });

    const canvas = document.createElement("canvas");

    canvas.width = Math.ceil(img.width * DEFAULT_TARGET_SCALE);
    canvas.height = Math.ceil(img.height * DEFAULT_TARGET_SCALE);

    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const finalImgBlob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          resolve(blob);
        }
        reject();
      }, "image/png"),
    );

    outputEl.removeChild(rootEl);

    return finalImgBlob;
  }, [reportTableData, outputElRef]);

  const handleGenerateImgURL = useCallback(async () => {
    const imgBlob = await generateImageBlob();

    if (imgBlob) {
      const imgURL = URL.createObjectURL(imgBlob);

      setImgURL((curr) => {
        URL.revokeObjectURL(curr);
        return imgURL;
      });
    }
  }, [generateImageBlob]);

  return { outputElRef, generateImageBlob, handleGenerateImgURL, imgURL };
};
