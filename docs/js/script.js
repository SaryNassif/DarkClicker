document.addEventListener('DOMContentLoaded', () => {
    // Popup logic remains the same
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

    // Game variables
    const clicker = document.querySelector('.clicker');
    const darksDisplay = document.querySelector('header h1');
    const darksPerSecondDisplay = document.querySelector('header p');
    const statsPopup = document.querySelector('#statisticsPopup .popup-content');

    let darks = 0;
    let allTimeDarks = 0;
    let darksPerSecond = 0;
    let darksPerClick = 1;

    const upgradeButtons = document.querySelectorAll('.upgradebox');
    const upgradeThresholds = [0, 0, 5000, 5000, 20000, 20000, 50000, 50000, 100000, 100000, 250000, 250000];

    const upgrades = [
        { price: 10, effect: () => { darksPerClick++; }, label: "Dark Clicker" },
        { price: 50, effect: () => { darksPerSecond++; }, label: "Eclipse Pointer" }
    ];

    // Update dark counters
    function updateDarksDisplay() {
        darksDisplay.textContent = `${darks} Darks`;
        darksPerSecondDisplay.textContent = `Darks per second: ${darksPerSecond}`;
    }

    // Handle clicks on the clicker button
    function handleClick() {
        darks += darksPerClick;
        allTimeDarks += darksPerClick;
        updateDarksDisplay();
        checkUpgrades();
    }

    if (clicker) {
        clicker.addEventListener('click', handleClick);
    } else {
        console.error('Clicker element not found');
    }

    // Generate passive darks per second
    function generatePassiveDarks() {
        darks += darksPerSecond;
        updateDarksDisplay();
    }

    setInterval(generatePassiveDarks, 1000);

    // Check for upgrades to unlock
    function checkUpgrades() {
        upgradeButtons.forEach((button, index) => {
            if (darks >= upgradeThresholds[index]) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    }

    // Add upgrade functionality to upgrade buttons
    upgradeButtons.forEach((button, index) => {
        if (upgrades[index]) {
            button.textContent = upgrades[index].label;
            button.addEventListener('click', () => {
                if (darks >= upgrades[index].price) {
                    darks -= upgrades[index].price;
                    upgrades[index].effect();
                    upgrades[index].price = Math.floor(upgrades[index].price * 1.5);
                    updateDarksDisplay();
                    checkUpgrades();
                }
            });
        }
    });

    // Initial unlock for the first two upgrades
    checkUpgrades();

    // Add stats to the stats menu
    function updateStatsMenu() {
        statsPopup.innerHTML = `
            <span class="close">&times;</span>
            <h2>Statistics</h2>
            <p>All-Time Darks: ${allTimeDarks}</p>
            <p>Current Darks: ${darks}</p>
            <p>Darks per Second: ${darksPerSecond}</p>
        `;
        const close = statsPopup.querySelector('.close');
        close.addEventListener('click', () => {
            document.querySelector('#statisticsPopup').style.display = 'none';
        });
    }

    setInterval(updateStatsMenu, 500);
});
