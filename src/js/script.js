document.addEventListener('DOMContentLoaded', () => {
    function handlePopup(buttonSelector, popupSelector) {
        const button = document.querySelector(buttonSelector);
        const popup = document.querySelector(popupSelector);
        if (!button || !popup) {
            console.error(`Missing elements for button: ${buttonSelector} or popup: ${popupSelector}`);
            return;
        }
        const close = popup.querySelector('.close');

        button.addEventListener('click', () => {
            popup.style.display = 'block';
        });

        close.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    handlePopup('.settings', '#settingsPopup');
    handlePopup('.statistics', '#statisticsPopup');
    handlePopup('.skin', '#skinsPopup');

    const clicker = document.querySelector('.clicker');
    const darksDisplay = document.querySelector('header h1');
    const darksPerSecondDisplay = document.querySelector('header p');

    let darks = 0;
    let darksPerSecond = 0;

    function handleClick() {
        darks++;
        darksDisplay.textContent = `${darks} Darks`;
        darksPerSecondDisplay.textContent = `Darks per second: ${darksPerSecond}`;
    }

    if (clicker) {
        clicker.addEventListener('click', handleClick);
    } else {
        console.error('Clicker element not found');
    }

    function generatePassiveDarks() {
        darks += darksPerSecond;
        darksDisplay.textContent = `${darks} Darks`;
    }

    setInterval(generatePassiveDarks, 1000);
});