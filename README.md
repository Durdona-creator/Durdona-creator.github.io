# C Messenger

Multi-room real-time chat application written in pure C with the Win32 API.

This is a Code::Blocks/MinGW-ready base project for an Advanced C Programming university project. It demonstrates TCP sockets, Windows threads, synchronization, shared memory, named pipes, and a Win32 GUI client.


## Project Repository

Repository: `Durdona-creator/Durdona-creator.github.io`

Repository link: https://github.com/Durdona-creator/Durdona-creator.github.io

Repository owner: `Durdona-creator`

GitHub accounts:

| Name / GitHub Account | Role | GitHub Link |
|---|---|---|
| Durdona-creator | Project owner / developer | https://github.com/Durdona-creator |
| kezialawita | Team member / contributor | https://github.com/kezialawita |

## Team Members

| Name / GitHub Account | Role |
|---|---|
| Durdona-creator | Project owner / developer |
| kezialawita | Team member / contributor |

## Technologies Used

| Component | Technology |
|---|---|
| GUI | Win32 API, pure C |
| Networking | Winsock2 TCP sockets |
| Multi-user support | Windows threads using `CreateThread` |
| Synchronization | `CRITICAL_SECTION` |
| Inter-process communication | Named Pipe using `CreateNamedPipe` |
| Shared state | Shared Memory using `CreateFileMapping` |

## Project Structure

```text
messenger/
├── common/
│   └── messenger.h
├── server/
│   ├── messenger_server.c
│   └── messenger_server.cbp
├── client/
│   ├── messenger_client.c
│   └── messenger_client.cbp
├── Messenger.workspace
├── build_minGW.bat
└── README.md
```

## How to Open in Code::Blocks

1. Install Code::Blocks with MinGW.
2. Open `Messenger.workspace`.
3. Build both projects:
   - `messenger_server`
   - `messenger_client`
4. Run in this order:
   1. `bin/Debug/messenger_server.exe`
   2. `bin/Debug/messenger_client.exe`
   3. Open multiple client windows to test chat.

## Alternative Build

You can also build from Command Prompt:

```bat
build_minGW.bat
```

## Packet Format

```c
typedef struct {
    uint8_t  type;
    char     username[32];
    char     room[32];
    char     content[512];
    uint32_t timestamp;
} Packet;
```

## Default Rooms

- general
- programming
- university
- games
- random

## Notes

- This project is intended for Windows because it uses Win32 API, Winsock2, Windows threads, shared memory, and named pipes.
- Run the server before running the client.
- The default server address is `127.0.0.1:8080`.
- If the port is already used, change `SERVER_PORT` in `common/messenger.h`.

## GitHub Upload Commands

```bash
git init
git add .
git commit -m "Initial commit: C Messenger with Win32 GUI"
git branch -M main
git remote add origin https://github.com/Durdona-creator/Durdona-creator.github.io.git
git push -u origin main
```

## Academic Purpose

University Advanced C Programming Project — 2025

Authors: Durdona-creator and kezialawita


## If it does not run in Code::Blocks

1. Install **Code::Blocks with MinGW**. The normal Code::Blocks without compiler will not build this project.
2. Open `Messenger.workspace`, not only a single `.c` file.
3. Build `messenger_server` first, then build `messenger_client`.
4. Run `messenger_server.exe` first. Keep the black console window open.
5. Then run `messenger_client.exe`. Open another client window to test chatting.
6. If you get `bind failed`, another program is already using port 8080. Close the old server window or change `SERVER_PORT` in `common/messenger.h`.
7. If the client says it cannot connect, check Windows Firewall and make sure the server is running.

### Manual build command

You can also double-click `build_minGW.bat` from the `messenger` folder. It creates:

```text
bin\Debug\messenger_server.exe
bin\Debug\messenger_client.exe
```
