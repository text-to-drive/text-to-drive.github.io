document.addEventListener('DOMContentLoaded',function(event){      
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    const dataText = [ "Late Merging: The vehicle continues to the end of the on-ramp before merging.", "Lane Weaving: Moving in and out of lanes.", "Merging from Complete Stop: The vehicle comes to a complete stop before merging.", "Side-by-Side Driving: Consistently driving alongside another vehicle in a parallel lane.", "Tailgating: Maintain a small gap with the vehicle in front.", "Safe Distance: Maintain a safe following distance."];
  
    function typeWriter(text, i, element) {
      if (element === document.getElementById("merge-1")) {
        console.log("merge-1")
      }
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
      element.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, i + 1, element)
        }, 20);
      }
    }
    // Function to change the gif source
    function cycleGifs(currentIndex, totalGifs) {
      var imageElement = document.getElementById('teaser-trajectory');
      imageElement.src = 'static/videos/teaser_trajectory_' + currentIndex + '.gif';
      // StartTextAnimation(currentIndex)
      typeWriter(dataText[currentIndex], 0, document.getElementById("teaser"));
      // Set the timeout to the GIF's duration
      var gifDuration = 10100; // Duration in milliseconds for each gif
      
      // Check if there's a next gif to display
      var nextIndex = (currentIndex + 1) % totalGifs;
      setTimeout(function() {
        cycleGifs(nextIndex, totalGifs);
      }, gifDuration);
    }
    // Start with the first gif (index 0)
    cycleGifs(0, 6); // Change the second parameter to the total number of GIFs available

    // typeWriter(document.getElementsByClassName("item-merge-3")[0].querySelector("h1").innerText, 0, document.getElementsByClassName("item-merge-3")[0]);


    /* Summary */
    let hasSummaryAnimated = false; // Flag to prevent animation from running more than once

    const animateImages = () => {
      if (hasSummaryAnimated) return; // Exit if animation has already run

      hasSummaryAnimated = true; // Set flag as true

      setTimeout(() => { // Begin sequence after a 1-second delay
        const vehicles = document.querySelectorAll('.vehicle-img'); // Your vehicle images
        const summary = document.querySelector('.summary-img'); // Your summary image

        vehicles.forEach((vehicle, index) => {
          setTimeout(() => {
            vehicle.style.opacity = 1; // Fade in the vehicle image
            // Fade out summary image before changing the src
            summary.style.opacity = 0;

            setTimeout(() => {
              // Change the src after the summary image fades out
              summary.src = `static/images/summary/summary_${index + 1}.png`;
              // Brief delay to ensure fade-out completes before starting fade-in
              setTimeout(() => {
                summary.style.opacity = 1; // Fade in the summary image
              }, 100); // Adjust delay as necessary to match CSS transition
            }, 200); // Ensure there's enough time for the fade-out to be visible
          }, index * 2000); // Space out each step by 2 seconds
        });

        // Handle the final summary image fade-in
        setTimeout(() => {
          summary.style.opacity = 0;

          setTimeout(() => {
            summary.src = 'static/images/summary/summary_4.png';
            setTimeout(() => {
              summary.style.opacity = 1;
            }, 100);
          }, 200);
        }, vehicles.length * 2000); // After all vehicle images have faded in
      }, 1000);
    };

    const checkAndAnimate = () => {
      const section = document.querySelector('#state-summary'); // The section to monitor
      const position = section.getBoundingClientRect();

      // Check if the section is in view
      if (position.top < window.innerHeight && position.bottom >= 0) {
        animateImages(); // Start the animation sequence
        window.removeEventListener('scroll', checkAndAnimate); // Ensure animation only happens once
      }
    };

    window.addEventListener('scroll', checkAndAnimate);

    /* LLST */
    let currentImageIndex = 0;
    const images = [
      "static/images/llst/llst_overview_0.png",
      "static/images/llst/llst_overview_1.png",
      "static/images/llst/llst_overview_2.png"
    ];
    const llstImage = document.getElementById('llst-image'); // Ensure this ID matches your HTML

    function changeLLSTImage() {
      llstImage.style.opacity = 0; // Fade out the current image
      setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length; // Increment the index and loop back to 0 if at the end
        llstImage.src = images[currentImageIndex];
        llstImage.style.opacity = 1; // Fade in the new image

        // Adjust the timeout based on whether the current image is the last in the array
        let nextChangeDelay = currentImageIndex === images.length - 1 ? 10000 : 2000;
        setTimeout(changeLLSTImage, nextChangeDelay);
      }, 250); // This should match the CSS transition time
    }

    // Function to start the animation when the relevant section is scrolled into view
    function startAnimationOnScroll() {
      const section = document.querySelector('#llst-image'); // Adjust this selector as needed
      const position = section.getBoundingClientRect();

      // Check if the section is in view
      if (position.top < window.innerHeight && position.bottom >= 0) {
        // Delay the start of the animation
        setTimeout(() => {
          changeLLSTImage(); // Start the image animation sequence after a delay
        }, 1000); // Delay in milliseconds, adjust this value as needed

        window.removeEventListener('scroll', startAnimationOnScroll); // Ensure animation only happens once
      }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', startAnimationOnScroll);

    // You might want to initially set the image opacity to 1 if it's not visible right away
    llstImage.style.opacity = 1;

    /* TERMINAL */
    let currentMessageIndex = 0; // Keep track of the current message index
    let animationStarted = false; // Flag to ensure the animation starts only once

    function updateTerminal() {
      if (currentMessageIndex == 0) {
        document.getElementById('terminal').innerHTML = ''; // Clear the terminal on the first message
      }
      const terminal = document.getElementById('terminal');
      const messages = [
        ["t: 00, 'Entering': True, 'Merging Area': False, 'Late Merging Area': False, 'Merged': False"],
        ["t: 05, 'Entering': False, 'Merging Area': True, 'Late Merging Area': False, 'Merged': False"],
        ["t: 10, 'Entering': False, 'Merging Area': False, 'Late Merging Area': True, 'Merged': False"],
        ["t: 15, 'Entering': False, 'Merging Area': False, 'Late Merging Area': False, 'Merged': True"],
      ];

      // Create a text node for the current message
      const message = document.createTextNode(messages[currentMessageIndex] + "\n");
      const pre = document.createElement('pre'); // Use <pre> to maintain formatting
      pre.appendChild(message);
      terminal.appendChild(pre);
      // change image
      const imageElement3 = document.getElementsByClassName("ash-img-container")[0].getElementsByTagName("img")[0];
      imageElement3.src = "static/images/history/history_" + currentMessageIndex + ".png";

      // Scroll to the bottom of the terminal div
      terminal.scrollTop = terminal.scrollHeight;

      // Increment the message index, looping back to 0 if at the end
      currentMessageIndex++;

      // Adjust the interval for the last message
      if (currentMessageIndex >= messages.length) {
        setTimeout(updateTerminal, 3000); // Wait longer at the last message
        currentMessageIndex = 0; // Reset the message index after the delay
      } else {
        setTimeout(updateTerminal, 1000); // Regular interval for other messages
      }
    }

    // Function to start the message update when the relevant section is scrolled into view
    function startUpdateOnScroll() {
      const terminalSection = document.getElementById('terminal'); // Adjust this selector as needed
      const position = terminalSection.getBoundingClientRect();

      // Check if the section is in view and animation hasn't started yet
      if (!animationStarted && position.top < window.innerHeight && position.bottom >= 0) {
        animationStarted = true; // Prevent multiple triggers
        setTimeout(updateTerminal, 500); // Start with a delay after scrolling into view
        window.removeEventListener('scroll', startUpdateOnScroll); // Optional: Ensure it only starts once
      }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', startUpdateOnScroll);


    /* FINITE STATE MACHINE */
    let currentImageIndexFSM = 0;
    const imagesFSM = [
      "static/images/fsm/fsm_overview_2.png",
      "static/images/fsm/fsm_overview_3.png",
      "static/images/fsm/fsm_overview_4.png",
      "static/images/fsm/fsm_overview_5.png"
    ];
    const fsmElement = document.getElementById('fsm-image'); // Ensure this ID matches your HTML element

    let animationStartedFSM = false; // Flag to ensure the animation starts only once

    function changeImageFSM() {
      currentImageIndexFSM = (currentImageIndexFSM + 1) % imagesFSM.length; // Increment the index and loop back to 0 if at the end
      fsmElement.src = imagesFSM[currentImageIndexFSM];
      
      // Adjust the timeout based on whether the current image is the last in the array
      let nextChangeDelay = currentImageIndexFSM === imagesFSM.length - 1 ? 3000 : 1000; // Longer delay on last image
      if (!animationStartedFSM) { // If the animation hasn't started due to a scroll, don't set the next timeout
        return;
      }
      setTimeout(changeImageFSM, nextChangeDelay);
    }

    // Function to start the image cycle when the relevant section is scrolled into view
    function startCycleOnScroll() {
      const fsmSection = document.getElementById('fsm-image'); // Adjust this selector as needed
      const position = fsmSection.getBoundingClientRect();

      // Check if the section is in view and the animation hasn't started yet
      if (!animationStartedFSM && position.top < window.innerHeight && position.bottom >= 0) {
        animationStartedFSM = true; // Prevent the animation from being triggered multiple times
        setTimeout(changeImageFSM, 1000); // Start the cycle with an initial delay
        window.removeEventListener('scroll', startCycleOnScroll); // Optional: Remove the event listener to ensure it only starts once
      }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', startCycleOnScroll);
});