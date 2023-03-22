import { MouseEventHandler } from "react"
import { useCarouselContext } from "."
import { Button, ButtonProps } from "../Button"

export type CarouselButtonProps = ButtonProps & {
  carouselVariant?: "next" | "previous" | "custom";
  goTo?: number;
};
export const CarouselButton = (props: CarouselButtonProps) => {
  const { carouselVariant, goTo, ...buttonProps } = props;
  const { next, previous, goToIndex } = useCarouselContext();
  const v = carouselVariant || "next";
  const action: MouseEventHandler<HTMLButtonElement> = () => {
    v === "next"
      ? next()
      : v === "previous"
      ? previous()
      : goToIndex(goTo || 0);
  };
  return <Button {...buttonProps} onClick={action} />;
};