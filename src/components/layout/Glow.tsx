export function TopRightGlow() {
  return (
    <div className="bg-yellow/35 absolute top-0 right-0 -z-10 size-100 rounded-full blur-[300px]" />
  );
}

export function BottomLeftGlow() {
  return (
    <div className="bg-yellow/50 absolute bottom-0 left-0 -z-10 h-125 w-50 -rotate-30 rounded-full blur-[300px]" />
  );
}

export function BottomRightGlow() {
  return (
    <div className="bg-yellow/50 absolute right-0 bottom-0 -z-10 h-125 w-50 -rotate-30 rounded-full blur-[300px]" />
  );
}

export function TopGlow() {
  return (
    <div className="bg-yellow/40 absolute -top-25 left-1/2 -z-10 h-37.5 w-225 -translate-x-1/2 -rotate-12 rounded-full blur-[250px]" />
  );
}

export function BottomGlow() {
  return (
    <div className="bg-yellow/40 absolute -bottom-25 left-1/2 -z-10 h-37.5 w-225 -translate-x-1/2 -rotate-12 rounded-full blur-[250px]" />
  );
}
