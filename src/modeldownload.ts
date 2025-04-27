import * as vscode from 'vscode';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

async function ensureModelDownloaded() {
    const modelPath = path.join(__dirname, '..', 'models', 'tinyllama-1.1b-chat-v1.0.Q2_K.gguf');

    if (!fs.existsSync(modelPath)) {
        const choice = await vscode.window.showInformationMessage(
            'Model not found. Download now?',
            'Yes', 'No'
        );

        if (choice === 'Yes') {
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Downloading TinyLlama.gguf",
                cancellable: false
            }, (progress) => {
                return new Promise<void>((resolve, reject) => {
                    const file = fs.createWriteStream(modelPath);
                    https.get('https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q2_K.gguf', (response) => {
                        response.pipe(file);
                        file.on('finish', () => {
                            file.close();
                            vscode.window.showInformationMessage('Model download complete!');
                            resolve();
                        });
                    }).on('error', (err) => {
                        fs.unlink(modelPath, () => {});
                        vscode.window.showErrorMessage('Failed to download model.');
                        reject(err);
                    });
                });
            });
        }
    }
}

export { ensureModelDownloaded };