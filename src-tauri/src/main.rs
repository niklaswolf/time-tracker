// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};
use tauri_plugin_positioner::{Position, WindowExt};
use user_idle::UserIdle;

fn main() {
    let system_tray_menu = SystemTrayMenu::new();
    let mut system_tray = SystemTray::new();
    system_tray = system_tray.with_menu(system_tray_menu).with_title("00:00");

    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {

                    let window = app.get_window("menubar").unwrap();
                    // use TrayCenter as initial window position
                    let _ = window.move_window(Position::TrayCenter);
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                _ => {}
            }
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => {
                // detect click outside of the focused window and hide the app
                if !is_focused && event.window().label() == "menubar" {
                    event.window().hide().unwrap();
                }
            },
            tauri::WindowEvent::CloseRequested {
                api, ..
            } => {
                if event.window().label() == "main" {
                    event.window().hide().unwrap();
                    api.prevent_close()
                }
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![update_system_tray_title, get_idle_time])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn update_system_tray_title(title: &str, app_handle: tauri::AppHandle){
    let _ =app_handle.tray_handle().set_title(title);
}
#[tauri::command]
fn get_idle_time() -> u64{
    let idle = UserIdle::get_time().unwrap();
    let idle_seconds = idle.as_seconds();
    idle_seconds.into()
}
