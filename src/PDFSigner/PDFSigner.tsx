import React, {
  CSSProperties,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { PDFViwer } from "../PDFViewer";
import { SignPlaceholder } from "./SignPlaceholder";
import { getCookie, setCookie } from "../cookie";

const btnStyles: CSSProperties = {
  border: "1px solid gray",
  padding: "2px 5px",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  cursor: "pointer",
};
const wrapperStyles: CSSProperties = { position: "relative" };
const overlayAreaStyles: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(200,100,150,0.1)",
  zIndex: 1,
  overflow: "hidden",
};

type Sign = {
  userId: number;
  name: string;
  placement: { x: number; y: number };
};

const signsProps: Sign[] = [
  { userId: 1, name: "Ilia", placement: { x: -1, y: -1 } },
  { userId: 2, name: "George", placement: { x: -1, y: -1 } },
  { userId: 3, name: "Geri", placement: { x: -1, y: -1 } },
];

export const PDFSigner: React.FC<{ file: File }> = ({ file }) => {
  const [activeSign, setActiveSign] = useState<Sign | null>(null);
  const [mousePlacement, setMousePlacements] = useState({ x: -1, y: -1 });
  const [signs, setSigns] = useState<Sign[]>(
    JSON.parse(getCookie("signs")) || signsProps
  );
  const [isPlacing, setIsPlacing] = useState(false);

  useEffect(() => {
    console.log(signs);
  }, [signs]);

  const overlayRef = useRef<HTMLDivElement>(null);

  const onHover = (e: MouseEvent<HTMLDivElement>) => {
    if (!isPlacing || !overlayRef.current) return;

    const rect = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePlacements({ x, y });
  };

  const onOverlayClick = () => {
    setIsPlacing(false);

    if (activeSign) {
      const tempSigns = [...signs];
      const tempSign = tempSigns.find((it) => it.userId === activeSign.userId);
      if (tempSign) {
        tempSign.placement = mousePlacement;
        setSigns(tempSigns);
        setActiveSign(null);
        setCookie("signs", JSON.stringify(tempSigns));
      }
    }
  };

  const onPlaceSignClick = () => {
    setIsPlacing(true);
  };

  const choseActiveSign = (sign: Sign) => {
    setActiveSign(sign);
    setMousePlacements({ x: sign.placement.x, y: sign.placement.y });
  };

  const getSignPlacement = (el: Sign) => {
    if (el.userId === activeSign?.userId && isPlacing) {
      return mousePlacement;
    }

    return el.placement;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div style={btnStyles} onClick={onPlaceSignClick}>
          Place sign
        </div>
        Sign for:
        {signs.map((sign) => (
          <div
            key={sign.name}
            style={btnStyles}
            onClick={() => choseActiveSign(sign)}
          >
            {sign.name}
          </div>
        ))}
      </div>
      <div style={wrapperStyles}>
        <div
          ref={overlayRef}
          style={overlayAreaStyles}
          onClick={onOverlayClick}
          onMouseMove={onHover}
        >
          {signs.map((el) => (
            <SignPlaceholder key={el.userId} {...getSignPlacement(el)}>
              {el.name}
            </SignPlaceholder>
          ))}
        </div>
        <PDFViwer file={file}></PDFViwer>
      </div>
    </>
  );
};
