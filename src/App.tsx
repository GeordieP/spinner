import { useCanvasContainer, useCanvas } from "./hooks/useResizingCanvas";
import {
  Accessor,
  createEffect,
  createSignal,
  For,
  Index,
  onMount,
  Show,
} from "solid-js";
import shuffleArray from "./util/shuffleArray";
import LabelInput from "./components/LabelInput";
import Time from "./util/time";

const palettes = [
  ["#0c79a8", "#0e8ac0", "#109cd8", "#13acee", "#2bb4f0"], // blue
  ["#43cd3e", "#56d352", "#6ad867", "#7edd7b", "#92e28f"], // green
  ["#984907", "#b05509", "#c9600a", "#e16c0b", "#f37812"], // orange
  ["#640798", "#7409b0", "#840ac9", "#940be1", "#a212f3"], // purple
];
const colors = palettes[Math.floor(Math.random() * palettes.length)];

const TWOPI = Math.PI * 2; // util/QoL variable
const INNER_RADIUS = 6; // radius of circle in the center of the wheel
const FRICTION = 0.991; // rate at which to slow the wheel down
const ARROW_SIZE = 23; // size in pixels of the ticker arrow
const MIN_SPEED = 0.4; // min randomized spin speed
const MAX_SPEED = 0.65; // max randomized spin speed
const SPIN_END_SPD = 0.0005; // speed at which spinning should stop
const CLR_WHITE = "white";
const CLR_BLACK = "black";
const CLR_EMPTY = "transparent";

// Conversion helper functions
const rad2Deg = (rad: number) => (rad * 180) / Math.PI;
const deg2Rad = (deg: number) => (deg * Math.PI) / 180;

function getColor(index: number) {
  if (index === 0) index = Math.floor(colors.length / 2);
  return colors[index % colors.length];
}

const DEFAULT_LABELS = [""];

export default function SpinnerPage() {
  const { canvasContainerRef, containerWidth, containerHeight } =
    useCanvasContainer();
  const [labels, setLabels] = createSignal(DEFAULT_LABELS);
  const [history, setHistory] = createSignal<string[]>([]);
  const [spinning, setSpinning] = createSignal(false);
  let firstInputRef: HTMLElement, lastInputRef: HTMLElement;

  // TODO: why does the canvas get force rendered every time the user starts a new spin?

  function onSpinDecision(selection: string) {
    setHistory((x) => [selection, ...x].slice(0, 6));
  }

  function newLabel() {
    cancelSpin();
    setLabels((x) => [...x, ""]);
    lastInputRef?.focus();
  }

  function updateLabel(index: number, newLabel: string) {
    cancelSpin();
    setLabels((x) => {
      const temp = [...x];
      temp.splice(index, 1, newLabel);
      return temp;
    });
  }

  function duplicateLabel(index: number) {
    cancelSpin();
    setLabels((x) => {
      if (index < 0 || index > x.length) return x;

      const temp = [...x];
      temp.splice(index, 0, temp[index]);
      return temp;
    });
  }

  function removeLabel(index: number) {
    cancelSpin();
    setLabels((x) => {
      const temp = [...x];
      temp.splice(index, 1);
      return temp;
    });
    lastInputRef?.focus();
  }

  function clearAllLabels() {
    const res = window.confirm("Are you sure you want to clear the wheel?");
    if (!res) return;
    cancelSpin();
    setLabels(DEFAULT_LABELS);
    firstInputRef?.focus();
  }

  function shuffleLabels() {
    cancelSpin();
    setLabels((x) => shuffleArray(x.filter((y) => y != null && y.length > 0)));
  }

  function cancelSpin() {
    // TODO: reset angle when spin is cancelled
    setSpinning(false);
  }

  // Always keep at least 1 empty field at the end
  createEffect(() => {
    const emptyLabels = labels().filter((x) => x == null || x.length === 0);
    if (emptyLabels.length < 1) newLabel();
  });

  onMount(() => {
    firstInputRef?.focus();
  });

  return (
    <main>
      <section id="sidebar">
        <div id="controls">
          <button onClick={clearAllLabels}>Clear All</button>
          <button onClick={shuffleLabels}>Shuffle</button>
          <button onClick={cancelSpin} disabled={!spinning()}>
            Cancel Spin
          </button>
        </div>
        <div id="rows">
          <Index each={labels()}>
            {(item: Accessor<string>, index: number) =>
              (
                <div class="input-row">
                  <button onClick={() => removeLabel(index)}>x</button>
                  <button onClick={() => duplicateLabel(index)}>&</button>
                  <LabelInput
                    value={item()}
                    onUpdateLabel={(txt) => updateLabel(index, txt)}
                    ref={(el: HTMLInputElement) => {
                      if (index === 0) firstInputRef = el;
                      else if (index === labels().length - 1) lastInputRef = el;
                    }}
                    onEnter={newLabel}
                  />
                </div>
              ) as any
            }
          </Index>
        </div>

        <Show when={history().length > 0}>
          <br />
          <hr />
          <br />
        </Show>

        <ul id="history-list">
          <Index each={history()}>
            {(item, index) => <li data-index={index}>{item()}</li>}
          </Index>
        </ul>
      </section>

      <section
        id="canvas"
        ref={canvasContainerRef}
        onClick={() => setSpinning(true)}
      >
        <Spinner
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          labels={labels}
          onSpinDecision={onSpinDecision}
          spinning={spinning}
          stopSpin={() => setSpinning(false)}
        />
      </section>
    </main>
  );
}

interface SpinnerProps {
  containerWidth: () => number;
  containerHeight: () => number;
  labels: () => string[];
  onSpinDecision: (selection: string) => void;
  spinning: () => boolean;
  stopSpin: () => void;
}

function Spinner(props: SpinnerProps) {
  const filteredLabels = () =>
    props.labels().filter((x) => x != null && x.length > 0);

  const sliceSize = () => TWOPI / filteredLabels().length;
  const halfSlice = () => sliceSize() / 2;

  const { canvasRef } = useCanvas(
    props.containerWidth,
    props.containerHeight,
    createRenderer
  );

  function createRenderer(canvasElement: HTMLCanvasElement) {
    if (canvasElement == null) {
      console.error("[createRenderer] Failed to find canvas element");
      return;
    }

    const ctx = canvasElement.getContext("2d");
    if (ctx == null) {
      console.error("[createRenderer] Failed to find canvas ctx");
      return;
    }

    const time = new Time();
    let frame = requestAnimationFrame(update);

    let DIAMETER = 0;
    let HALF_WIDTH = 0;
    let HALF_HEIGHT = 0;
    let HALF_SMALLER = 0;
    let RADIUS = 0;

    let TRANSLATE_X = 0;
    let TRANSLATE_Y = 0;

    let angle = 0;
    let speed = 0;
    let ticking = false;

    speed = Math.random() * MAX_SPEED + MIN_SPEED;

    function setDefaults() {
      if (ctx == null) {
        console.error("[setDefaults] Failed to find canvas ctx");
        return;
      }

      ctx.font = "20px Arial"; // TODO: size this dynamically based on label length
      DIAMETER = Math.min(canvasElement.width, canvasElement.height);
      HALF_WIDTH = canvasElement.width / 2;
      HALF_HEIGHT = canvasElement.height / 2;
      RADIUS = DIAMETER / 2;
      HALF_SMALLER = Math.min(HALF_WIDTH, HALF_HEIGHT);
      TRANSLATE_X = HALF_WIDTH - RADIUS;
      TRANSLATE_Y = HALF_HEIGHT - RADIUS;
      ctx?.translate(TRANSLATE_X, TRANSLATE_Y);
    }

    setDefaults();

    function update() {
      if (!props.spinning()) {
        // TODO: this executes when we finish a spin with 1 item, and resets the angle immediately when the spin finishes

        // if we're given only 1 label, rotate the angle by 180deg so the
        // text renders right-side up.
        if (filteredLabels().length === 1) angle = Math.PI;
        return;
      }

      time.update();

      speed = speed * FRICTION;
      angle = angle + speed;

      // reset angle above 2pi (360deg)
      if (angle >= TWOPI) angle = 0;

      // if the arrow is near a border between two slices, we want to
      // render it in a different color to show a 'tick' effect.
      // Threshold is based on speed so the tick effect lasts for the same duration
      // no matter if the wheel is going fast or slow.
      // *6 is a magic number here, just to make the tick last a bit longer.
      ticking = angle % sliceSize() < speed * 6;

      // finish the spin below a certain threshold
      if (speed < SPIN_END_SPD) {
        // figure out where we landed
        const index = Math.floor(
          (360 - (rad2Deg(angle) % 360)) / rad2Deg(sliceSize())
        );

        props.onSpinDecision(filteredLabels()[index]);

        // one last paint for this cycle in order to render the stopped state.
        render();
        props.stopSpin();
        speed = Math.random() * MAX_SPEED + MIN_SPEED;
        return;
      }

      render();
      frame = requestAnimationFrame(update);
    }

    function render() {
      if (ctx == null) return;

      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      // Draw "no items added" text in the center of the canvas.
      if (filteredLabels() == null || filteredLabels().length === 0) {
        const text = "Add some items using the sidebar";
        const measure = ctx.measureText(text);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(text, RADIUS - measure.width / 2, RADIUS);
        return;
      }

      /* --- Draw labels --- */
      const labels = filteredLabels();
      for (let i = 0; i < labels.length; i++) {
        const drawAngle = angle + sliceSize() * i;

        /* --- Draw wheel segment --- */
        ctx.beginPath();
        ctx.arc(
          RADIUS,
          RADIUS,
          RADIUS,
          drawAngle,
          drawAngle + sliceSize(),
          false
        );
        ctx.arc(
          RADIUS,
          RADIUS,
          INNER_RADIUS,
          drawAngle + sliceSize(),
          drawAngle,
          true
        );
        ctx.fillStyle = getColor(i);
        ctx.fill();
        ctx.closePath();

        /* --- Draw text --- */
        ctx.translate(RADIUS, RADIUS);
        ctx.rotate(drawAngle + halfSlice());
        ctx.fillStyle = CLR_WHITE;
        ctx.fillText(labels[i], RADIUS / 4, 0, RADIUS);

        ctx.rotate(-(drawAngle + halfSlice()));
        ctx.translate(-RADIUS, -RADIUS);
      }

      /* --- Draw arrow --- */
      ctx.beginPath();
      ctx.moveTo(DIAMETER - ARROW_SIZE, HALF_SMALLER); // left point (tip)
      ctx.lineTo(DIAMETER, HALF_SMALLER - ARROW_SIZE); // bottom point
      ctx.lineTo(DIAMETER, HALF_SMALLER + ARROW_SIZE); // top point
      ctx.lineTo(DIAMETER - ARROW_SIZE, HALF_SMALLER); // back to tip
      // fill with white if the arrow is 'ticking' (passing over the boundary
      // between two segments), otherwise transparent.
      // if we're no longer spinning, fill it with black.
      if (props.spinning()) ctx.fillStyle = ticking ? CLR_WHITE : CLR_EMPTY;
      else ctx.fillStyle = CLR_BLACK;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }

    return function renderLoop() {
      setDefaults();
      update();
      render();
    };
  }

  return <canvas ref={canvasRef}></canvas>;
}
