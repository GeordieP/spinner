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

  onMount(function containerSizeListener() {
    // INFO: we call the update fn once on mount to set things up,
    //       and then call it again whenever the element size changes.
    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);

    return function cleanup() {
      window.removeEventListener("resize", updateContainerSize);
    };
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
  let renderCallback: ReturnType<typeof createRenderer>;
  let canvasElement: HTMLCanvasElement | undefined;

  function render() {
    // INFO: render callback initialization
    if (renderCallback == null) {
      if (canvasElement != null) {
        renderCallback = createRenderer(canvasElement);

        // if it's still null/undefined, let's just bail out
        if (renderCallback == null) {
          throw new Error(
            "useCanvas was given no renderer, and failed to create a new one; exiting."
          );
        }
      }
    }

    if (renderCallback) renderCallback();
  }

  const canvasRef = (el?: HTMLCanvasElement) => {
    canvasElement = el;
    // in order to set up canvas sizing, positioning, etc, we run this initial render when the ref is set.
    render();
  };

  createEffect(function forceRenderWhenSizeChanges() {
    if (canvasElement == null) return;
    canvasElement.width = containerWidthSignal();
    canvasElement.height = containerHeightSignal();
    render();
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
