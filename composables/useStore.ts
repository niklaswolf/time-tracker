
export type TrackedTimeEntry = {
    startTime: Date,
    endTime: Date,
    taskId: string,
}
const STORAGE_KEY = 'tracked_times';
const store = useLocalStorage<TrackedTimeEntry[]>(STORAGE_KEY, []);

export const useStore = () => {
    const entries = computed<TrackedTimeEntry[]>(() => store.value.map(entry => ({
        startTime: new Date(entry.startTime),
        endTime: new Date(entry.endTime),
        taskId: entry.taskId
    })));
    function addEntry (entry: TrackedTimeEntry) {
        store.value = [...store.value, entry]
    }

    function clearEntries (){
        store.value = [];
    }

    return {
        addEntry,
        clearEntries,
        entries
    }
}
