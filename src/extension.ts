import * as vscode from 'vscode';
import { runLocalModel } from './runner';
import { ensureModelDownloaded } from './modeldownload';
import { getWebviewContent } from './ui';

export function activate(context: vscode.ExtensionContext) {
    console.log('🔥 Local AI extension is now active!');

    const disposable = vscode.commands.registerCommand('localai.runModel', async () => {
        const modelReady = await ensureModelDownloaded();
        if (!modelReady) {
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'localaiPrompt', 
            'AI Model Prompt', 
            vscode.ViewColumn.One, 
            {
                enableScripts: true, 
                retainContextWhenHidden: true 
            }
        );

        panel.webview.html = getWebviewContent();

        panel.webview.onDidReceiveMessage(
            async (message) => {
                if (message.command === 'runPrompt') {
                    const userPrompt = message.text;
                    if (userPrompt) {
                        await runLocalModel(userPrompt); 
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
