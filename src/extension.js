const vscode = require('vscode');
const path = require('path');
const evaluation = require('./features/evaluation/editor');

function projectRoot(context) {
  const configured = vscode.workspace.getConfiguration('fredisEvaluation').get('applicationRoot', '');
  if (configured) {
    const folder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || context.extensionPath;
    return path.resolve(folder, configured);
  }
  return context.extensionPath;
}

function activate(context) {
  const output = vscode.window.createOutputChannel('FREDIS Evaluation');
  context.subscriptions.push(output);
  for (const [command, kind] of [
    ['fredis.openEvaluation', null],
    ['fredis.openColumnEvaluation', 'column'],
    ['fredis.openGroupedEvaluation', 'grouped'],
  ]) {
    context.subscriptions.push(vscode.commands.registerCommand(command,
      () => evaluation.open(context, output, projectRoot, kind)));
  }
  evaluation.register(context, output, projectRoot);
}

function deactivate() {}
module.exports = { activate, deactivate };
