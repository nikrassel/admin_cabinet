import httpService from "./http.service"

const messageEndpoint = "messages/"

const messageService = {
    get: async () => {
        const { data } = await httpService.get(messageEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            messageEndpoint + payload.id,
            payload
        )
        return data
    }
}

export default messageService
