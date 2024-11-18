document.addEventListener('DOMContentLoaded', () => {
    // Function to handle opening and closing popups
    function handlePopup(buttonSelector, popupSelector) {
        const button = document.querySelector(buttonSelector);
        const popup = document.querySelector(popupSelector);
        if (!button || !popup) {
            console.error(`Missing elements for button: ${buttonSelector} or popup: ${popupSelector}`);
            return;
        }
        const close = popup.querySelector('.close');

        // Open the popup
        button.addEventListener('click', () => {
            popup.style.display = 'block';
        });

        // Close the popup when the close button is clicked
        close.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // Close the popup when clicking outside the content
        window.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    // Attach popup handlers
    handlePopup('.settings', '#settingsPopup');
    handlePopup('.statistics', '#statisticsPopup');
    handlePopup('.skin', '#skinsPopup');
});
