import {invoke} from "@tauri-apps/api";

export const useSystemTray = () => {

    function updateTitle(title: string){
        invoke('update_system_tray_title', {title})
    }

    return {
        updateTitle
    }
}
