type Filter = {
    id: string,
    name: string,
    searchUrl: string
}


type Task = {
    id: string,
    label: string
    url ?: string,
}

type Credentials = {
    username: string, password: string
}

interface TaskApiInterface {
    fetchTasks: () => Promise<unknown>
    fetchFilters: () => Promise<Filter[]>
    login: (credentials: Credentials) => void
}
