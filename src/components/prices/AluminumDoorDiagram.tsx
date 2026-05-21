import { PvcWindowDiagram } from "@/components/prices/PvcWindowDiagram";
import type { PvcRectangleDiagram } from "@/content/pvcPricesPageData";

type AluminumDoorDiagramProps = {
  widthMm: number;
  heightMm: number;
};

const BASE_VISUAL_HEIGHT = 1400;
const WIDTH_VISUAL_SCALE_NUM = 15;
const WIDTH_VISUAL_SCALE_DEN = 14;

export function AluminumDoorDiagram({ widthMm, heightMm }: AluminumDoorDiagramProps) {
  // Reuse the exact PVC single-door visual language and scale only the door width by size.
  const visualWidthMm = Math.round((widthMm * WIDTH_VISUAL_SCALE_NUM) / WIDTH_VISUAL_SCALE_DEN);
  const diagram: PvcRectangleDiagram = {
    shape: "rectangle",
    widthMm: visualWidthMm,
    heightMm: BASE_VISUAL_HEIGHT,
    diagramDimWidthMm: widthMm,
    diagramDimHeightMm: heightMm,
    panels: [{ type: "opening", openingStyle: "tilt-turn" }],
    leftPaneOfTwoPaneTotalWidthMm: visualWidthMm * 2,
  };

  return <PvcWindowDiagram {...diagram} avoidStretch />;
}
