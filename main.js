/**
 * MAIN FUNCTION
 */
let main = () => {
    /**
     * Builds the DOM and returns UI controller
     * @see {@link https://github.com/yourproject/docs/uiController.md}
     */
    const uiController = buildDom()
    fetchAllAsync()
    console.log(database)
}

main()