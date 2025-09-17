# headr 🚀

A simple VS Code extension that displays developer information in the header bar. 👨‍💻✨

## Features 🛠️

- Shows developer name and details in the VS Code header 🧑‍💻
- Easy configuration via settings ⚙️
- Lightweight and fast ⚡

## Installation 📦

1. Download the latest `.vsix` file from the [Releases](https://github.com/sjoblomtobias/headr/releases).
2. In VS Code, go to Extensions > ... > Install from VSIX.
3. Select the downloaded file to install.

## Usage 🎯

After installation, the developer header will appear automatically. You can configure the displayed information in the extension settings.

## Configuration 📝

Add the following to your VS Code `settings.json`:

```json
{
	"headr.fileExtensions": [".js", ".ts"],
	"headr.lines": ["/**", " * @author {AUTHOR}", " * @since {SINCE}", " * @summary", " */"],
	"headr.author": "Your Name",
	"headr.documentation": "https://your.documentation.url",
	"headr.ignoreFolders": ["node_modules", ".git", ".vscode", "dist", "out"]
}
```

## Development 🧑‍🔬

1. Clone the repository:
    ```bash
    git clone https://github.com/sjoblomtobias/headr.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Build and watch:
    ```bash
    npm run watch
    ```
4. Package the extension:
    ```bash
    npm run package
    ```

## License 📄

MIT
