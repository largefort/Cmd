const commands = {
    help: {
        description: "Lists available commands.",
        execute: () => {
            return "Available commands: " + Object.keys(commands).join(", ");
        }
    },
    about: {
        description: "Information about this terminal.",
        execute: () => {
            return "This is an advanced mobile CMD terminal created with HTML, CSS, and JavaScript.";
        }
    },
    clear: {
        description: "Clears the terminal screen.",
        execute: (args, output) => {
            output.innerHTML = '';
            return '';
        }
    },
    echo: {
        description: "Displays messages.",
        execute: (args) => {
            return args.join(" ");
        }
    },
    date: {
        description: "Displays the current date and time.",
        execute: () => {
            return new Date().toString();
        }
    },
    greet: {
        description: "Greets the user.",
        execute: (args) => {
            return `Hello, ${args.join(" ")}!`;
        }
    },
    calc: {
        description: "Performs basic arithmetic operations.",
        execute: (args) => {
            try {
                const result = eval(args.join(" "));
                return `Result: ${result}`;
            } catch (error) {
                return "Invalid calculation.";
            }
        }
    },
    random: {
        description: "Generates a random number.",
        execute: (args) => {
            const min = parseInt(args[0], 10) || 0;
            const max = parseInt(args[1], 10) || 100;
            return `Random number: ${Math.floor(Math.random() * (max - min + 1)) + min}`;
        }
    },
    joke: {
        description: "Tells a joke.",
        execute: () => {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "Why don't programmers like nature? It has too many bugs."
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
    },
    weather: {
        description: "Displays a dummy weather report.",
        execute: () => {
            return "The current weather is sunny with a chance of rain.";
        }
    },
    sum: {
        description: "Calculates the sum of numbers.",
        execute: (args) => {
            const sum = args.reduce((acc, num) => acc + parseFloat(num), 0);
            return `Sum: ${sum}`;
        }
    },
    fortune: {
        description: "Tells your fortune.",
        execute: () => {
            const fortunes = [
                "You will have a great day!",
                "An unexpected event will bring you joy.",
                "You will meet someone interesting.",
                "Challenges will come, but you will overcome them."
            ];
            return fortunes[Math.floor(Math.random() * fortunes.length)];
        }
    },
    reverse: {
        description: "Reverses a string.",
        execute: (args) => {
            return args.join(" ").split("").reverse().join("");
        }
    },
    palindrome: {
        description: "Checks if a word is a palindrome.",
        execute: (args) => {
            const str = args.join("").toLowerCase();
            const reversed = str.split("").reverse().join("");
            return str === reversed ? "Yes, it's a palindrome!" : "No, it's not a palindrome.";
        }
    },
    factorial: {
        description: "Calculates the factorial of a number.",
        execute: (args) => {
            const num = parseInt(args[0], 10);
            if (isNaN(num) || num < 0) return "Please enter a non-negative integer.";
            let result = 1;
            for (let i = 2; i <= num; i++) {
                result *= i;
            }
            return `Factorial of ${num} is ${result}`;
        }
    },
    prime: {
        description: "Checks if a number is prime.",
        execute: (args) => {
            const num = parseInt(args[0], 10);
            if (isNaN(num) || num < 2) return "Enter an integer greater than 1.";
            for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
                if (num % i === 0) return `${num} is not a prime number.`;
            }
            return `${num} is a prime number.`;
        }
    },
    roll: {
        description: "Rolls a dice.",
        execute: (args) => {
            const sides = parseInt(args[0], 10) || 6;
            return `You rolled a ${Math.floor(Math.random() * sides) + 1}`;
        }
    },
    quote: {
        description: "Displays a random inspirational quote.",
        execute: () => {
            const quotes = [
                "The best way to predict the future is to invent it. - Alan Kay",
                "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
                "The only way to do great work is to love what you do. - Steve Jobs",
                "The purpose of our lives is to be happy. - Dalai Lama"
            ];
            return quotes[Math.floor(Math.random() * quotes.length)];
        }
    },
    jafet: {
        description: "Starts a mini-game.",
        execute: (args, output) => {
            if (args[0] === '--start' && args[1] === 'game' && args[2] === 'of' && args[3] === 'fun') {
                startPongGame();
                return '';
            }
            return "Invalid command. Try 'jafet --start game of fun'";
        }
    }
};

function startPongGame() {
    const canvas = document.getElementById('pongCanvas');
    canvas.classList.remove('hidden');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        speedX: 2,
        speedY: 2
    };

    let player = {
        x: 10,
        y: canvas.height / 2 - 30,
        width: 10,
        height: 60,
        speed: 5,
        moveUp: false,
        moveDown: false
    };

    let computer = {
        x: canvas.width - 20,
        y: canvas.height / 2 - 30,
        width: 10,
        height: 60
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') player.moveUp = true;
        if (event.key === 'ArrowDown') player.moveDown = true;
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowUp') player.moveUp = false;
        if (event.key === 'ArrowDown') player.moveDown = false;
    });

    function movePlayer() {
        if (player.moveUp && player.y > 0) player.y -= player.speed;
        if (player.moveDown && player.y < canvas.height - player.height) player.y += player.speed;
    }

    function moveComputer() {
        if (ball.y < computer.y + computer.height / 2) {
            computer.y -= player.speed;
        } else if (ball.y > computer.y + computer.height / 2) {
            computer.y += player.speed;
        }
    }

    function moveBall() {
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.speedY *= -1;
        }

        if (ball.x - ball.radius < player.x + player.width &&
            ball.y > player.y && ball.y < player.y + player.height) {
            ball.speedX *= -1;
        }

        if (ball.x + ball.radius > computer.x &&
            ball.y > computer.y && ball.y < computer.y + computer.height) {
            ball.speedX *= -1;
        }

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            resetBall();
        }
    }

    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX *= -1;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillRect(computer.x, computer.y, computer.width, computer.height);
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }

    function gameLoop() {
        movePlayer();
        moveComputer();
        moveBall();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
