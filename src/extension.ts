import * as vscode from 'vscode';
import { runLocalModel } from './runner';

export function activate(context: vscode.ExtensionContext) {
    console.log('🔥 Local AI extension is now active!');

    
let disposable = vscode.commands.registerCommand('localai.runModel', async () => {
    const userPrompt = await vscode.window.showInputBox({ prompt: 'Enter your prompt for the AI model:' });
    if (userPrompt) {
        runLocalModel(userPrompt);
    }
});

    context.subscriptions.push(disposable);
}

export function deactivate() {}



