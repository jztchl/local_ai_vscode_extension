import * as vscode from 'vscode';
import { runLocalModel } from './runner';
import { ensureModelDownloaded } from './modeldownload';
import { getWebviewContent } from './ui';

export function activate(context: vscode.ExtensionContext) {
    console.log('🔥 Local AI extension is now active!');

    const disposable = vscode.commands.registerCommand('localai.runModel', async () => {
        // Ensure the model is downloaded before proceeding
        await ensureModelDownloaded();

        // Open a custom Webview
        const panel = vscode.window.createWebviewPanel(
            'localaiPrompt', // Identifies the type of the webview (used internally)
            'AI Model Prompt', // Title of the panel
            vscode.ViewColumn.One, // Show the webview in the first column
            {
                enableScripts: true, // Allow JavaScript in the webview
                retainContextWhenHidden: true // Keep state even when the webview is hidden
            }
        );

        // Set the HTML content for the webview
        panel.webview.html = getWebviewContent();

        // Handle the response from the webview (when the user submits their prompt)
        panel.webview.onDidReceiveMessage(
            async (message) => {
                if (message.command === 'runPrompt') {
                    const userPrompt = message.text;
                    if (userPrompt) {
                        await runLocalModel(userPrompt); // Pass the prompt to the model
                    }
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
