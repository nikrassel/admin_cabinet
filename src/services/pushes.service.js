import httpService from "./http.service";

const pushesEndpoint = "pushes/"

const pushesService = {
    get: async () => {
        const { data } = await httpService.get(pushesEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            pushesEndpoint + payload.id,
            payload
        )
        return data
    }
}

export default pushesService
