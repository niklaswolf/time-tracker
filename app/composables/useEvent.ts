import {emit, listen} from "@tauri-apps/api/event";

export const useEvent = () => {
    return {emit, listen}
}
