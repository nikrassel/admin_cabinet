import httpService from "./http.service"

const tasksEndpoint = "tasks/"

const tasksService = {
    get: async () => {
        const { data } = await httpService.get(tasksEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            tasksEndpoint + payload.id,
            payload
        )
        return data
    }
}

export default tasksService
