function getWebviewContent() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Model Prompt</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 10px;
                background-color: #f4f4f4;
                color: #333;
            }
            h1 {
                color: #3d7d97;
            }
            textarea {
                width: 100%;
                height: 150px;
                padding: 10px;
                font-size: 14px;
                margin-top: 10px;
                border-radius: 5px;
                border: 1px solid #ccc;
                resize: none;
            }
            button {
                margin-top: 10px;
                padding: 10px 15px;
                background-color: #3d7d97;
                color: white;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #2c5f72;
            }
        </style>
    </head>
    <body>
        <h1>Enter Your Prompt</h1>
        <textarea id="userPrompt" placeholder="Type your prompt here..."></textarea>
        <button id="submitButton">Run AI Model</button>

        <script>
            const submitButton = document.getElementById('submitButton');
            submitButton.addEventListener('click', () => {
                const userPrompt = document.getElementById('userPrompt').value;
                if (userPrompt.trim() !== '') {
                    // Send the prompt to the extension
                    vscode.postMessage({
                        command: 'runPrompt',
                        text: userPrompt
                    });
                } else {
                    alert('Please enter a prompt!');
                }
            });
        </script>
    </body>
    </html>`;
}

export { getWebviewContent };