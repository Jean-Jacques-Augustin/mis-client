import React, {useState, useEffect} from "react";
import {IconButton, useMediaQuery} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {styled, createTheme, ThemeProvider} from "@mui/material";

interface FadeSliderProps {
    children: React.ReactNode;
}

const CarouselContainer = styled("div")({
    position: "relative",
    overflow: "hidden",
    width: "100%",
    marginBottom: "16px",
});

const CarouselSlider = styled("div")(({theme}) => ({
    display: "flex",
    transition: "transform 0.5s ease-in-out",
    whiteSpace: "nowrap",
    width: "100%",
    maxWidth: "100%",
    [`@media (min-width: ${theme.breakpoints.values.sm}px)`]: {
        maxWidth: "50%",
    },
    [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
        maxWidth: "33.333333%",
    },
}));

const Slide = styled("div")({
    flex: "0 0 100%",
    width: "100%",
});

const CarouselControls = styled("div")({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
});

const PrevButton = styled(IconButton)({
    position: "absolute",
    left: 0,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
});

const NextButton = styled(IconButton)({
    position: "absolute",
    right: 0,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
});

const theme = createTheme();

const FadeSlider: React.FC<FadeSliderProps> = ({children}) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const slideCount = React.Children.count(children);

    const handleNextSlide = () => {
        setActiveIndex(prevIndex => (prevIndex + 1) % slideCount);
    };

    const handlePrevSlide = () => {
        setActiveIndex(prevIndex =>
            prevIndex === 0 ? slideCount - 1 : prevIndex - 1,
        );
    };

    useEffect(() => {
        const autoplayInterval = setInterval(() => {
            handleNextSlide();
        }, 5000);

        return () => {
            clearInterval(autoplayInterval);
        };
    }, [activeIndex, slideCount]);

    const lgScreen = useMediaQuery(theme.breakpoints.up("lg"));

    let itemsPerRow = 1;
    if (lgScreen) {
        itemsPerRow = 3;
    }

    let maxVisibleSlides = itemsPerRow;
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    if (smScreen && itemsPerRow > 1) {
        maxVisibleSlides = itemsPerRow - 1;
    }

    return (
        <ThemeProvider theme={theme}>
            <CarouselContainer>
                <CarouselControls style={{left: 0}}>
                    <PrevButton onClick={handlePrevSlide}>
                        <NavigateBeforeIcon />
                    </PrevButton>
                </CarouselControls>
                <CarouselSlider
                    style={{
                        transform: `translateX(-${
                            activeIndex * (100 / maxVisibleSlides)
                        }%)`,
                    }}>
                    {React.Children.map(children, (child, index) => {
                        if (React.isValidElement(child)) {
                            return <Slide key={index}>{child}</Slide>;
                        }
                        return null;
                    })}
                </CarouselSlider>
                <CarouselControls style={{right: 0}}>
                    <NextButton onClick={handleNextSlide}>
                        <NavigateNextIcon />
                    </NextButton>
                </CarouselControls>
            </CarouselContainer>
        </ThemeProvider>
    );
};

export default FadeSlider;
