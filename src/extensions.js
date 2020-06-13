const vscode = require('vscode');

export function activate(context) {
  vscode.commands.executeCommand("workbench.action.tasks.build");
}