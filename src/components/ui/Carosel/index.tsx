import {
  Children,
  createContext,
  useContext,
  useState,
} from "react";
import { Box, BoxProps } from "../Box";

export type CarouselProps = BoxProps & {
  loop?: boolean;
  animationTime?: number;
};

type CarouselContextType = {
  index: number;
  goToIndex: (i: number) => void;
  next: () => void;
  previous: () => void;
  direction: "from-left" | "from-right";
  animating: boolean;
  animationTime: number;
  startAnimation: () => void;
  endAnimation: () => void;
};
const CarouselContext = createContext<CarouselContextType | null>(null);
const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (context === null) {
    throw new Error("useCarousel must be used within a CarouselProvider");
  }
  return context;
};

export const Carousel = (props: CarouselProps) => {
  const { loop, className, ...boxProps } = props;
  const carouselValue = useCarouselControls(props);
  return (
    <CarouselContext.Provider value={carouselValue}>
      <Box {...boxProps} className={[className, "carousel"]} />
    </CarouselContext.Provider>
  );
};

const useCarouselControls = (props: CarouselProps): CarouselContextType => {
  const { children, loop } = props;
  const animationTime = props.animationTime ?? 600
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"from-left" | "from-right">(
    "from-right"
  );
  const [animating, setAnimationState] = useState(false);

  const getNextIndex = (current: number, direction: "next" | "previous") => {
    const maxIndex = Children.count(children) - 1;
    let nextIndex = direction === "next" ? current + 1 : current - 1;
    const loopToStart = nextIndex > maxIndex && loop;
    const stopAtMax = nextIndex > maxIndex && !loop;
    const loopToEnd = nextIndex < 0 && loop;
    const stopAtStart = nextIndex < 0 && !loop;
    if (loopToStart) nextIndex = 0;
    if (stopAtMax) nextIndex = maxIndex;
    if (loopToEnd) nextIndex = maxIndex;
    if (stopAtStart) nextIndex = 0;
    return nextIndex;
  };
  const goToIndex = (index: number) => {
    setIndex(index);
  };
  const setNextIndex = (direction: "next" | "previous") => {
    setIndex((p) => getNextIndex(p, direction));
    setDirection(direction === "next" ? "from-right" : "from-left");
  };
  const next = () => setNextIndex("next");
  const previous = () => setNextIndex("previous");
  const startAnimation = () => {
    setAnimationState(true);
    setTimeout(endAnimation, animationTime);
  };
  const endAnimation = () => setAnimationState(false);
  const voidCb = () => {};
  return {
    index,
    next: animating ? voidCb : next,
    previous: animating ? voidCb : previous,
    goToIndex: animating ? voidCb : goToIndex,
    direction,
    animationTime,
    animating,
    startAnimation,
    endAnimation,
  };
};

export type SlideProps = BoxProps & {
  index: number;
};

export const Slide = (props: SlideProps) => {
  const { index: slideIndex, className, ...boxProps } = props;
  const { index, direction, animating } = useCarouselContext();
  const isActive = index === slideIndex;
  const cName = [className, "slide", isActive && "active", animating && direction];
  return <Box className={cName} {...boxProps} />;
};
