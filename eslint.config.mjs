import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrittier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
	{
		languageOptions: {
			globals: { ...globals.node },
		},
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	eslintPluginPrittier,
	{
		files: ["**/*.{ts,mts,cts}"],
		plugins: {
			tseslint,
			import: importPlugin,
		},
		extends: [tseslint.configs.recommended],
		languageOptions: { parserOptions: { ecmaVersion: "latest", sourceType: "module" } },
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json",
				},
			},
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "warn",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					vars: "all",
					args: "after-used",
					caughtErrors: "all",
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
			"capitalized-comments": ["error", "always", { ignoreConsecutiveComments: true }],
			eqeqeq: ["error", "always"],
			"no-console": "warn",
			curly: ["error", "all"],
			"no-restricted-imports": [
				"error",
				{
					patterns: [".*"],
				},
			],
			"import/order": [
				"error",
				{
					groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
					pathGroups: [
						{
							pattern: "@/**",
							group: "internal",
							position: "before",
						},
					],
					pathGroupsExcludedImportTypes: ["builtin"],
					"newlines-between": "never",
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
				},
			],
		},
	},
	{
		files: ["dist/**/*.{js,ts,mts,cts}"],
		rules: {
			"no-restricted-imports": "off",
		},
	},
]);
