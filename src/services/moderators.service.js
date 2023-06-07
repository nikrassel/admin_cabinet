import httpService from "./http.service"

const moderatorsEndpoint = "moderators/"

const moderatorsService = {
    get: async () => {
        const { data } = await httpService.get(moderatorsEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            moderatorsEndpoint + payload.id,
            payload
        )
        return data
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            moderatorsEndpoint + payload.id,
            payload
        )
        return data
    }
}

export default moderatorsService
