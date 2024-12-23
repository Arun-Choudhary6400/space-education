import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const changePlanetPosition = (ref) => {

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".second-section", // The section triggering the animation
            start: "top 50%", // Start when the section reaches the top
            end: "bottom 50%", // End when the bottom of the section reaches the top
            toggleActions: "play reverse play reverse",
            // scrub: true
        },

    });

    tl.to(ref.current.position, {
        x: -1, // Adjust z for depth if needed
        y: 1.5, // Center vertically
        z: -1.7, // Move to the right
        duration: 1.3, // Transition duration
    });

    const thSecTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".third-section",
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play reverse play reverse",
            // scrub: true
        },
    });
    thSecTl.to(ref.current.position, {
        x: 1.7,
        y: 1.5,
        z: 0,
        duration: 1.3,
    });
    // thSecTl.to(ref.current.position, {
    // x: 0.9,
    //   y: -3,
    //   z: 0,
    //   duration: 3,
    // }, 3);
}