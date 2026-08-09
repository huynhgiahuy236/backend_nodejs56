export const logAPI = () => {
    return (req, res, next) => {
        const method = req.method
        const url = req.originalUrl
        const ip = req.ip

        const messAPI = `${new Date().toLocaleString()} \t ${method} \t ${url} \t ${ip}`;
        next()
    }

}
