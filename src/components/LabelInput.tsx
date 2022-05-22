export default function LabelInput(props: {
  value: string;
  onUpdateLabel: (newLabel: string) => void;
  ref: any;
  onEnter: () => void;
}) {
  function onBlur(e: any) {
    props.onUpdateLabel(e.currentTarget.value);
  }

  function onKeyPress(e: any) {
    if (e.keyCode === 13) {
      debugger;
      props.onEnter();
    }
  }

  return (
    <input
      type="text"
      onBlur={onBlur}
      value={props.value}
      ref={props.ref}
      onKeyPress={onKeyPress}
    />
  );
}
