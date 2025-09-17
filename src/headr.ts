/**
 * @author Tobias Sjöblom <tobias@thelimebranch.com>
 * @since 1.1.0
 * @summary This is the main entry point for the headr extension.
 */
import * as fs from "fs";
import * as path from "path";
import type * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
	// Register command to insert header into the active file
	const vscodeModule = await import("vscode");
	context.subscriptions.push(
		vscodeModule.commands.registerCommand("headr.insertHeader", async () => {
			const editor = vscodeModule.window.activeTextEditor;
			if (!editor) {
				return;
			}
			const document = editor.document;
			const filePath = document.uri.fsPath;
			if (!matchesExtension(filePath) || isIgnored(filePath)) {
				return;
			}
			// Always insert header at the top
			await editor.edit((editBuilder) => {
				editBuilder.insert(new vscodeModule.Position(0, 0), buildHeader());
			});
			await document.save();
		}),
	);
	const vscode = await import("vscode");
	const config = vscode.workspace.getConfiguration("headr");
	const ignoreFolders: string[] = config.get("ignoreFolders", []);
	const fileExtensions: string[] = config.get("fileExtensions", [".ts", ".js"]);
	const headerLines: string[] = config.get("lines", []);
	const author: string = config.get("author", "");

	function isIgnored(filePath: string): boolean {
		return ignoreFolders.some((folder) => filePath.includes(`/${folder}/`));
	}

	function matchesExtension(filePath: string): boolean {
		return fileExtensions.some((ext) => filePath.endsWith(ext));
	}

	function buildHeader(): string {
		let pkgVersion = "";
		try {
			// Always read workspace package.json
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (workspaceFolders && workspaceFolders.length > 0) {
				const workspacePkgPath = path.join(workspaceFolders[0].uri.fsPath, "package.json");
				const pkgRaw = fs.readFileSync(workspacePkgPath, "utf8");
				const pkgJson = JSON.parse(pkgRaw);
				pkgVersion = pkgJson.version || "";
			}
		} catch {
			pkgVersion = "";
		}
		const date = new Date().toISOString().split("T")[0];
		return headerLines.map((line) => line.replace("{AUTHOR}", author).replace("{SINCE}", pkgVersion).replace("{DATE}", date)).join("\n") + "\n";
	}

	const disposable = vscode.workspace.onDidCreateFiles(async (event) => {
		for (const file of event.files) {
			const filePath = file.fsPath;
			if (!matchesExtension(filePath) || isIgnored(filePath)) {
				continue;
			}
			try {
				const document = await vscode.workspace.openTextDocument(file);
				const editor = await vscode.window.showTextDocument(document, { preview: false });
				// Always insert header at the top
				await editor.edit((editBuilder) => {
					editBuilder.insert(new vscode.Position(0, 0), buildHeader());
				});
				await document.save();
			} catch (_err) {
				// Failed to insert header
			}
		}
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}
