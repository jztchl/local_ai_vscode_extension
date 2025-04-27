import * as path from 'path';
import * as vscode from 'vscode';
import { spawn } from 'child_process';

export function runLocalModel(prompt: string) {
    const modelPath = path.join(__dirname, '..', 'models', 'tinyllama-1.1b-chat-v1.0.Q2_K.gguf');
    const llamaCppBinary = path.join(__dirname, '..', 'llama.cpp', 'main');

    const modelProcess = spawn(llamaCppBinary, [
        '--model', modelPath,
        '--prompt', prompt
    ]);

    modelProcess.stdout.on('data', (data) => {
        vscode.window.showInformationMessage(`💬 Model Says: ${data.toString()}`);
    });

    modelProcess.stderr.on('data', (data) => {
        console.error(`🚨 Model Error: ${data.toString()}`);
    });

    modelProcess.on('close', (code) => {
        console.log(`Model process exited with code ${code}`);
    });
}
