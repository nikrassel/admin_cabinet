import httpService from "./http.service"

const usersEndpoint = "users/"

const usersService = {
    get: async () => {
        const { data } = await httpService.get(usersEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            usersEndpoint + payload.id,
            payload
        )
        return data
    }
}

export default usersService
