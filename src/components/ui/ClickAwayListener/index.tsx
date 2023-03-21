import { PropsWithChildren, useEffect, useRef } from "react";
import { Box } from "../Box";

export const ClickAwayListener = (
  props: PropsWithChildren<{ onClickAway: () => void }>
) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const cb = (e: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as any)) return;
      props.onClickAway();
    };
    window.addEventListener("click", cb);
    return () => {
      window.removeEventListener("click", cb);
    };
  }, []);
  return <Box ref={ref}>{props.children}</Box>;
};
