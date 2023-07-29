import {JiraAdapter} from "~/service/Task/JiraAdapter";

export default defineNuxtPlugin(nuxtApp => {
    const jiraAdapter: TaskApiInterface = new JiraAdapter(nuxtApp.$config.public.jiraEndpoint);

    return {
        provide: {
            taskService: jiraAdapter
        }
    }
})
