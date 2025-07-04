Component Layout Structure:

1. Wrapper Container: Create a main container to hold the entire AboutUs section. This should be set up as a flex container with a vertical direction to allow stacking of image-text pairs.
Hero Section: Before the first text scrolls into view, display the image as a hero. This image should cover the full viewport width and height (100vh). Position the image centrally.

2.Scroll-Based Transformation:
Use the useState and useEffect hooks to manage the current active image state and detect the user's scroll position.
Implement a function to check the scroll position of each text section and update the current image accordingly.

3.Image and Text Pair Structure:
Image Column: Create a left-side container for displaying the image. This column should initially display the hero image and transition to displaying images corresponding to each text section.
Text Column: Create a right-side container with a full height (100vh). Each text section should be positioned at the bottom of the container using CSS flex alignment (align-items: flex-end or justify-content: flex-end).

4. Dynamic Image Change:
On scroll, detect when each text section enters the viewport. When a section reaches the bottom of the viewport, trigger a function to change the active image.
Use IntersectionObserver or a combination of getBoundingClientRect() and window event listeners for scroll detection.

5. Styling:
Ensure the main wrapper has a display of flex with a column layout for the hero section and a row layout for the image-text pairs.
Set up CSS classes or inline styles to make each column take up 50% width when in the two-column layout.
Style each text section to have height: 100vh with text aligned at the bottom.

6.Responsive Design:
Make sure the component is responsive by adjusting flex properties or using CSS media queries to handle various screen sizes.

7.State Management:
Use React's state management (useState) to keep track of the current active image index.
On initial load, display the hero image, and as the user scrolls down, update the state to change the image based on which text section is currently in view.

8.Hero to Two-Column Transition:
Initially, display the hero image full-screen using a div styled with position: fixed and width: 100%.
Once the first text section reaches the bottom of the viewport, adjust the image's position to the left column with position: relative and a 
width: 50%.

9.Image Update Logic:
Create an array to hold the image URLs or data.
When a text section scrolls into view (detected by the scroll event), update the active image index state, which controls the displayed image.

10.Animation/Transition:
Add CSS transitions or animations for smoother transitions between the hero and fixed two-column layout.
Apply fade or slide-in effects when changing images as new text sections enter the viewport.