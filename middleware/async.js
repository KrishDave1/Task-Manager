const asyncWrapper = (fn) => { // controller logic is stored in fn argument.
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error); // middleware function for error handling.
        }
    }
}

module.exports = asyncWrapper;
