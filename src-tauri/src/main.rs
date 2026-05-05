// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    menu::Menu,
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager,
};
use tauri_plugin_positioner::{Position, WindowExt};
use user_idle::UserIdle;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_positioner::init())
        .setup(|app| {
            let menu = Menu::new(app)?;
            TrayIconBuilder::with_id("main")
                .menu(&menu)
                .title("00:00")
                .on_tray_icon_event(|tray, event| {
                    tauri_plugin_positioner::on_tray_event(tray.app_handle(), &event);
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        let window = app.get_webview_window("menubar").unwrap();
                        let _ = window.move_window(Position::TrayCenter);
                        if window.is_visible().unwrap() {
                            window.hide().unwrap();
                        } else {
                            window.show().unwrap();
                            window.set_focus().unwrap();
                        }
                    }
                })
                .build(app)?;
            Ok(())
        })
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::Focused(is_focused) => {
                // detect click outside of the focused window and hide the app
                if !is_focused && window.label() == "menubar" {
                    window.hide().unwrap();
                }
            }
            tauri::WindowEvent::CloseRequested { api, .. } => {
                if window.label() == "main" {
                    window.hide().unwrap();
                    api.prevent_close()
                }
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            update_system_tray_title,
            get_idle_time
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn update_system_tray_title(title: &str, app_handle: tauri::AppHandle) {
    if let Some(tray) = app_handle.tray_by_id("main") {
        let _ = tray.set_title(Some(title));
    }
}
#[tauri::command]
fn get_idle_time() -> u64 {
    let idle = UserIdle::get_time().unwrap();
    let idle_seconds = idle.as_seconds();
    idle_seconds.into()
}
