const config = {
    // ...
    scene: {
        preload: preload,
        create: create,
        update: update,
        initial: showInitialScreen, // Make sure these are here
        home: showHomeScreen,
        game: showGameScreen,
        cutscene: showCutscene, // Add cutscene scene
        ending: showEndingScreen
    }
};

const game = new Phaser.Game(config);
let currentScene = 'initial';
let customers = [];
let orders = [];
let dialogueIndex = 0;

function preload() {
    // Load images and sounds
    this.load.image('background', 'assests/images/start_background.png');
    this.load.image('headsetIcon', 'assests/images/headphones.png');
    this.load.image('bbcheesecake', 'assests/images/pastry/blueberry_cheesecake.png');
    this.load.image('burntcheesecake', 'assests/images/pastry/burnt.png');
    this.load.image('cheesecake', 'assests/images/pastry/cheesecake.png');
    this.load.image('croissant', 'assests/images/pastry/croissant.png');
    this.load.image('flatbread', 'assests/images/pastry/flatbread.png');
    this.load.image('chocolat', 'assests/images/pastry/pan_au_chocolat.png');
    this.load.image('coffee', 'assests/images/beverages/coffee.png');
    this.load.image('icoffee', 'assests/images/beverages/iced_coffee.png');
    this.load.image('fcoffee', 'assests/images/beverages/whipped_coffee.png');
    this.load.image('matcha', 'assests/images/beverages/matcha.png');
    this.load.image('imatcha', 'assests/images/beverages/iced_matcha.png');
    this.load.image('fmatcha', 'assests/images/beverages/matcha_frappe.png');
    this.load.image('pomegranate', 'assests/images/beverages/pomegranate.png');
    this.load.image('ipomegranate', 'assests/images/beverages/pomegranate_ice.png');
    this.load.image('fpomegranate', 'assests/images/beverages/pomegranate_frappe.png');
    this.load.image('end', 'assests/fin.png');
    this.load.image('counter', 'assests/images/counter.png');
    this.load.image('coffeemachine', 'assests/images/machine/coffee_machine.png');
    this.load.image('ice', 'assests/images/machine/ice.png');
    this.load.image('matchamachine', 'assests/images/machine/matcha_machine.png');
    this.load.image('pomegranatemachine', 'assests/image/machine/pomegranate_machine.png');
    this.load.image('whippedcream', 'assests/images/machine/whipped_cream.png');
    this.load.image('tablogo', 'assests/images/tab_logo.png');
    this.load.image('yes', 'assests/images/yes.png');
    this.load.image('letter', 'assests/images/letter.png');
    this.load.image('no', 'assests/images/no.png');
    this.load.image('textprompt1', 'assests/images/text_prompt_1.png');
    this.load.image('textprompt2', 'assests/images/text_prompt_2.png');
    this.load.image('girlmessage', 'assests/images/girl_message.png');
    this.load.image('guymessage', 'assests/images/guy_message.png');
    this.load.image('person1', 'assests/images/customer/person1.png');
    this.load.image('person2', 'assests/images/customer/person2.png');
    this.load.image('person3', 'assests/images/customer/person3.png');
    this.load.image('person4', 'assests/images/customer/person4.png');
    this.load.image('person5', 'assests/images/customer/person5.png');
    this.load.image('person6', 'assests/images/customer/person6.png');
    this.load.audio('buttonClick', 'assets/sounds/click.mp3');
    this.load.audio('drinkPouring', 'assets/sounds/pouring.mp3');
    this.load.audio('talking', 'assets/sounds/talking.mp3');
    this.load.audio('ice', 'assets/sounds/ice.mp3');
    this.load.audio('cream', 'assets/sounds/cream.mp3');
    this.load.audio('bgm', 'assets/sounds/blue_bgm.mp3');
    this.load.svg('startButton', 'assets/start.svg');
    this.load.video('cutscene', 'assets/cutscene.mp4');
    // Add more assets as needed
}

function create() {
    if (currentScene === 'initial') {
        this.scene.start('initial');
        this.cameras.main.setBackgroundColor('#000000'); // Moved inside the 'if' block
        showInitialScreen.call(this); // Moved inside the 'if' block
    } else if (currentScene === 'home') {
        this.scene.start('home');
    } else if (currentScene === 'game') {
        this.scene.start('game');
    } else if (currentScene === 'ending') {
        this.scene.start('ending');
    }
    this.scene.events.on('create', () => { // Added this block
        if (currentScene === 'initial') {
            this.cameras.main.setBackgroundColor('#000000');
            showInitialScreen.call(this);
        } else if (currentScene === 'home') {
            //... other scene logic
        }
    });
}

function update() {
    // Game logic updates
}

function showInitialScreen() {
    const headsetIcon = this.add.image(400, 200, 'headsetIcon').setScale(0.5);
    const text = this.add.text(400, 300, 'Use headset for better experience', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
    this.time.delayedCall(1500, () => {
        currentScene = 'home';
        this.scene.restart();
    });
}

function showHomeScreen() {
    const startButton = this.add.svg(400, 300, 'start').setInteractive();
    startButton.on('pointerdown', () => {
        this.sound.play('buttonClick');
        currentScene = 'game';
        this.cameras.main.fadeOut(300);
        this.time.delayedCall(300, () => this.scene.start('game')); 
    });
}

function showGameScreen() {
    // Initialize game elements like customers, orders, and menus
    // Example of managing game state
    customers = [
        { id: 1, order: 'flatbread', served: false, drink: false },       // Customer 1: Flatbread
        { id: 2, order: 'matcha', served: false, drink: true },  // Customer 2: Matcha
        { id: 3, order: 'cheesecake', served: false, drink: false },    // Customer 3: Cheesecake
        { id: 4, order: 'pomegranate', served: false, drink: true }, // Customer 4: Pomegranate
        { id: 5, order: 'croissant', served: false, drink: false }, // Customer 5: Croissant
        { id: 6, order: 'coffee', served: false, drink: true }      // Customer 6: Coffee

    ];
    // Display customers and orders
    displayCustomers.call(this);
    
}

function displayCustomers() {
    // Logic to display customers and their orders
    const customerPositions = [
        { x: 100, y: 300 }, 
        { x: 250, y: 300 },
        { x: 400, y: 300 },
        { x: 550, y: 300 },
        { x: 700, y: 300 },
        { x: 850, y: 300 }
    ];

    customers.forEach((customer, index) => {
        const position = customerPositions[index]; // Get position for this customer

        customer.sprite = this.add.sprite(position.x, position.y, `customer${customer.id}`); // Create sprite
        customer.orderImage = this.add.image(position.x + 50, position.y - 50, customer.order).setOrigin(0.5); // Order image

        // Make order images interactive (for drag and drop later):
        customer.orderImage.setInteractive();
    });
    customers.forEach((customer, index) => {
        if (customerPositions[index]) { // Check if position exists
            const position = customerPositions[index];
            // ... rest of the code
        } else {
            console.warn("No position defined for customer", customer.id);
        }
    });
}

function handleOrder(customerId, order) {
    // Logic to handle order delivery
    const customer = customers.find(c => c.id === customerId);

    if (customer && customer.order === order) { // Check if customer exists and order matches
        //... (rest of your logic for correct order)
    } else {
        //... (rest of your logic for incorrect order)
    }

    customer.served = true; // Set served to true regardless of order correctness
    handleNextCustomer.call(this); // Call handleNextCustomer to proceed
}


function handleNextCustomer() {
    // Find the next customer who is not served
    const nextCustomer = customers.find(c =>!c.served);

    if (nextCustomer) {
        //... display next customer
    } else {
        // All customers served, transition to cutscene
        this.cameras.main.fadeOut(1000);
        this.time.delayedCall(1000, () => {
            this.scene.start('cutscene'); // Use start() with the correct scene key
        });
    }
}

function showCutscene() {
    // Logic for cutscene dialogue
    //... (video and dialogue setup)

    this.input.on('pointerdown', () => {
        if (showingLetter) {
            video.play(); // Resume video playback
            //...
        } else if (dialogueIndex < dialogue.length) {
            if (dialogue[dialogueIndex].includes("(Show Letter)")) {
                video.pause(); // Pause video playback
                //...
            } else {
                //...
            }
        } else {
            // Dialogue finished, transition to ending scene
            video.stop();
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1000, () => {
                this.scene.start('ending');
            });
        }
    });
}

function showEndingScreen() {
    const endingBackground = this.add.image(400, 300, 'ending_background').setOrigin(0.5);
    // ... any other ending screen elements (text, buttons, etc.)
}

// In your create function or game config:
function create() {
    // ...
    if (currentScene === 'end') {
        this.scene.start('end');
    }
}

// Placeholder for dialogue
const dialogue = [
    "Hi lovie",
    "Hello",
    "How’s your day?\nI hope you’re not so tired anyways, here is a letter for you.",
    // ... (Add the logic to show the letter image here)
    "Can I have the pleasure of being your valentine?"
    // ... (Handle "Yes/No" choices and subsequent dialogue)
    ,"Thank you my lovie, I’ll pick you up...", // If "Yes" is chosen
    "Okay I respect your wishes...", // If "No" is chosen
    // ... more dialogue
];
