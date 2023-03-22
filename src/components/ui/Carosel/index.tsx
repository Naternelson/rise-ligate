import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Box, BoxProps } from "../Box";
import "./style.css";

/** Carousel Context */

type CarouselContextType = {
  index: number;
  previousIndex: number | null;
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
export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (context === null) {
    throw new Error("useCarousel must be used within a CarouselProvider");
  }
  return context;
};

/** Carousel Compoenent */
export type CarouselProps = BoxProps & {
  loop?: boolean;
  animationTime?: number;
  slideCount: number;
};
export const Carousel = (props: CarouselProps) => {
  const { loop, className, animationTime, slideCount, ...boxProps } = props;
  const ref = useRef<HTMLDivElement>(null);
  const carouselValue = useCarouselControls(props);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.setProperty(
      "--animation-time",
      `${carouselValue.animationTime}ms`
    );
  }, [carouselValue.animationTime]);
  return (
    <CarouselContext.Provider value={carouselValue}>
      <Box ref={ref} {...boxProps} className={[className, "carousel"]} />
    </CarouselContext.Provider>
  );
};

/** Custom Hook for control over the Carosel, accepting the Carosel Props. Returns the Context Value for the Carousel */
const useCarouselControls = (props: CarouselProps): CarouselContextType => {
  const { loop, slideCount } = props;
  const animationTime = props.animationTime ?? 600;
  const [index, setIndex] = useState(0);
  const [previousIndex, setPIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"from-left" | "from-right">(
    "from-right"
  );
  const [animating, setAnimationState] = useState(false);

  /** Based off the current Slide number, the loop state, and the direction to go, retrieve what the logical next Slide should be */
  const getNextIndex = (current: number, direction: "next" | "previous") => {
    const maxIndex = slideCount - 1;
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
  /** Function that takes care of setting all the nessary variables on index change. 
   * 
   * For instance, if the index remains the same on action, do nothing
   * 
   * If the index changes, start the Animation state, set the New Index, capture the current Index and set the Direction state
   */
  const setNextIndex = (direction: "next" | "previous") => {
    const nextIndex = getNextIndex(index, direction);
    if (nextIndex === index) return;
    startAnimation();
    setIndex(nextIndex);
    setPIndex(index);
    setDirection(direction === "next" ? "from-right" : "from-left");
  };
  const next = () => setNextIndex("next");
  const previous = () => setNextIndex("previous");
  /** The Animation will automatically change to false after the given animation time */
  const startAnimation = () => {
    setAnimationState(true);

    setTimeout(() => {
      setPIndex(null);
      endAnimation();
    }, animationTime);
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
    previousIndex,
  };
};

/** Slide Component */
export type SlideProps = BoxProps & {
  index: number;
};

export const Slide = (props: SlideProps) => {
  const { index: slideIndex, className, ...boxProps } = props;
  const { index, direction, animating, previousIndex } = useCarouselContext();
  /** Is the current Slide the Active Slide */
  const isActive = index === slideIndex;
  /** Was the slide previously the active slide */
  const isLeaving = previousIndex === slideIndex;
  /** If the active slide, should we animate it on? */
  const entering = isActive && animating && direction;
  /** If the slide is exiting, what should the animation be */
  const leaving =
    isLeaving && animating
      ? direction === "from-left"
        ? "leaving to-right"
        : "leaving to-left"
      : undefined;
  /** Combine the ClassNames together */
  const cName = [className, "slide", isActive && "active", entering, leaving];

  return <Box className={cName} {...boxProps} />;
};

export * from "./CarouselButton";
