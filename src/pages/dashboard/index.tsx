import { Box } from "../../components/ui/Box"
import { Carousel, CarouselButton, Slide } from "../../components/ui/Carousel"
import "./style.css"

export const Dashboard = () => {
    return (
      <Box className={"center full-page"}>
        <Carousel id={"carousel"} slideCount={3} animationTime={800} loop>
          <Slide index={0} className="center grow">
            <Box className={"className center"}>
              <h1>Slide 1</h1>
            </Box>
          </Slide>
          <Slide index={1} className="center grow">
            <Box className={"className center"}>
              <h1>Slide 2</h1>
            </Box>
          </Slide>
          <Slide index={2} className="center grow">
            <Box className={"className center"}>
              <h1>Slide 3</h1>
            </Box>
          </Slide>
          <Box className={"carousel-button-group"}>
            <CarouselButton carouselVariant="previous">Back</CarouselButton>
            <CarouselButton carouselVariant="next">Next</CarouselButton>
          </Box>
        </Carousel>
      </Box>
    );
}