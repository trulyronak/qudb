export const environmentVariable = (name: string, value: string): string => {
	return `${name.toUpperCase()}=${value}`
}
