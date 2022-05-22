import { createEffect, createSignal, onMount } from "solid-js";

export function useCanvasContainer() {
  let canvasContainerElement: HTMLElement;
  const canvasContainerRef = (el: HTMLElement) => (canvasContainerElement = el);
  const [containerWidth, setContainerWidth] = createSignal(0);
  const [containerHeight, setContainerHeight] = createSignal(0);

  function updateContainerSize() {
    if (canvasContainerElement == null) return;
    setContainerWidth(canvasContainerElement.clientWidth);
    setContainerHeight(canvasContainerElement.clientHeight);
  }

  onMount(function containerSizeOnMount() {
    window.addEventListener("resize", updateContainerSize);
    updateContainerSize();
  });

  return {
    canvasContainerRef,
    containerWidth,
    containerHeight,
  };
}

export function useCanvas(
  containerWidthSignal: () => number,
  containerHeightSignal: () => number,
  createRenderer: (canvasElement: HTMLCanvasElement) => (() => void) | undefined
) {
  let canvasElement: HTMLCanvasElement | undefined;
  const canvasRef = (el?: HTMLCanvasElement) => (canvasElement = el);

  let forceRenderFunction: ReturnType<typeof createRenderer>;

  createEffect(() => {
    if (canvasElement == null) return;
    canvasElement.width = containerWidthSignal();
    canvasElement.height = containerHeightSignal();

    if (forceRenderFunction == null) {
      forceRenderFunction = createRenderer(canvasElement);
      return;
    }

    forceRenderFunction();
  });

  return {
    canvasRef,
  };
}

export default function useResizingCanvas(
  startRenderFunction: (
    canvasElement: HTMLCanvasElement
  ) => (() => void) | undefined
) {
  const { canvasContainerRef, containerWidth, containerHeight } =
    useCanvasContainer();
  const { canvasRef } = useCanvas(
    containerWidth,
    containerHeight,
    startRenderFunction
  );

  return {
    canvasContainerRef,
    canvasRef,
  };
}
