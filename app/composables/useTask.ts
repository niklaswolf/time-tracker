export const useTask = () => {
    const {startTimer, stopTimer, currentTaskId} = useTimer()

    const taskLabel = computed(() => {
        //TODO get real label if we have the real task list
        return currentTaskId.value;
    })
    const taskId = computed(() => {
        //TODO get real label if we have the real task list
        return "TK-123";
    })

    function startTask(taskId: string){
        currentTaskId.value = taskId;
        startTimer()
    }

    function stopTask(){
        stopTimer();
    }

    return {
        startTask,
        currentTaskId,
        taskLabel,
        taskId
    }
}
