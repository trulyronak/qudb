/**
 * Creates a random alphabetic string
 * Lifted from @csharptest.net (https://stackoverflow.com/a/1349426/4166655)
 * @param {number} length how long your random word will be — defaults to 10
 * @returns {string} the randomly generated string
 */
export const generateString = (length = 10): string => {
	let result           = ""
	const characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	const charactersLength = characters.length

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}

	return result
}
