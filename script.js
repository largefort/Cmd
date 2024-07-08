document.addEventListener('DOMContentLoaded', (event) => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const userInput = input.value.trim();
            handleCommand(userInput);
            input.value = '';
        }
    });

    function handleCommand(input) {
        const [command, ...args] = input.split(' ');
        const commandObj = commands[command.toLowerCase()];

        // Display the command
        const commandElement = document.createElement('div');
        commandElement.textContent = `$ ${input}`;
        output.appendChild(commandElement);

        // Handle the command
        let response;
        if (commandObj) {
            response = commandObj.execute(args, output);
        } else {
            response = `Command not found: ${command}`;
        }

        // Display the response
        if (response) {
            const responseElement = document.createElement('div');
            responseElement.textContent = response;
            output.appendChild(responseElement);
        }

        // Scroll to the bottom
        output.scrollTop = output.scrollHeight;
    }
});
