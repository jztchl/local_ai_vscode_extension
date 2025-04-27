import { spawn } from 'child_process';
import * as vscode from 'vscode';

export function runLocalModel(prompt: string) {
    const modelPath = './models/TinyLlama.gguf'; 
    const modelProcess = spawn('./llama.cpp/main', [
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
