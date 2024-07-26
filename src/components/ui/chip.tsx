function Chip(props: { value: string | number }) {
  return (
    <div className="bg-gray-600 rounded space-x-1 w-4 h-4.5 text-xs font-medium leading-5">
      {props.value}
    </div>
  );
}

export { Chip };
