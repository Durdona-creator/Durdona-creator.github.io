# 💬 C Messenger

**A multi-room real-time chat application written in pure C with the Win32 API.**

This project was created as a university Advanced C Programming project. It demonstrates how to build a desktop chat system using low-level Windows programming concepts, including TCP sockets, threads, synchronization, shared memory, and named pipes.

---

## 📌 Project Repository

- **Repository:** [Durdona-creator/Durdona-creator.github.io](https://github.com/Durdona-creator/Durdona-creator.github.io/tree/main)
- **Repository owner:** [Durdona-creator](https://github.com/Durdona-creator)

---

## 👥 Team Members

| Name / GitHub Account | Role |
|---|---|
| [Durdona-creator](https://github.com/Durdona-creator) | Project owner / developer |
| [kezialawita](https://github.com/kezialawita) | Team member / contributor |

---

## 🧰 Technologies Used

| Component | Technology |
|---|---|
| GUI | Win32 API, pure C, no external framework |
| Networking | Winsock2 TCP sockets |
| Multi-user support | Windows threads using `CreateThread` |
| Synchronization | `CRITICAL_SECTION` |
| Inter-process communication | Named Pipe using `CreateNamedPipe` |
| Shared state | Shared Memory using `CreateFileMapping` |

---

## 🏗️ Project Architecture

```text
messenger/
├── common/
│   └── messenger.h          # Shared structs, constants, and Packet definition
├── server/
│   ├── messenger_server.c   # TCP server, rooms, and thread management
│   └── messenger_server.vcxproj
├── client/
│   ├── messenger_client.c   # Win32 GUI client with a dark theme
│   └── messenger_client.vcxproj
└── Messenger.sln            # Visual Studio solution file
```

---

## ⚙️ How It Works

### Server

The server is responsible for accepting client connections, managing chat rooms, and broadcasting messages between users.

1. Creates a TCP socket using Winsock2.
2. Uses `bind`, `listen`, and `accept` to listen on port `8080`.
3. Creates a separate thread for every connected client using `CreateThread`.
4. Uses `CRITICAL_SECTION` to safely manage shared room and client data.
5. Uses `CreateFileMapping` to store the list of online users in shared memory.
6. Uses `CreateNamedPipe` to provide an IPC channel for admin monitoring.
7. Stores message history for each room and sends the latest messages to newly joined users.

### Client

The client provides a desktop GUI for users to join rooms and send messages in real time.

1. Uses a Win32 window procedure, `WndProc`, for event handling.
2. Uses custom drawing with `PAINTSTRUCT` and GDI to create a dark-themed interface.
3. Displays chat messages as bubble-style message blocks using a Telegram-inspired color palette.
4. Shows available rooms in a sidebar.
5. Runs a separate receive thread so incoming messages do not freeze the user interface.
6. Supports scrolling and sending messages with the Enter key.

---

## 📦 TCP Packet Format

The application uses a fixed-size packet structure, so additional message framing is not required.

```c
typedef struct {
    UINT8   type;           // MSG_CHAT, MSG_JOIN, etc.
    char    username[32];   // Sender username
    char    room[32];       // Chat room name
    char    content[512];   // Message content
    UINT32  timestamp;      // Message timestamp
} Packet;
```

---

## 🛠️ Build Instructions

### 1. Open the Solution

Open the project in **Visual Studio 2022**:

```text
Messenger.sln
```

### 2. Build the Project

Press:

```text
Ctrl + Shift + B
```

The compiled files will be generated in the `bin/Debug/` folder.

### 3. Run the Application

Start the programs in this order:

```text
1. Run messenger_server.exe first.
2. Run messenger_client.exe.
3. Open multiple client windows to test multi-user chat.
```

---

## 🚀 Uploading the Project to GitHub

Use the following commands to initialize and push the project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: C Messenger with Win32 GUI"
git branch -M main
git remote add origin https://github.com/Durdona-creator/Durdona-creator.github.io.git
git push -u origin main
```

---

## ✨ Project Highlights

- Written in **pure C** with no C++ dependencies.
- Uses the **Win32 API** without external GUI frameworks.
- Implements four important operating system concepts in one project:
  - TCP sockets
  - Threads
  - Shared memory
  - Named pipes
- Provides thread-safe room and client management using `CRITICAL_SECTION`.
- Includes a custom dark-themed renderer using GDI.
- Supports multiple users and multiple chat rooms in real time.

---

## 📚 Academic Purpose

This project was developed for an Advanced C Programming course. The main goal is to demonstrate practical knowledge of Windows system programming, networking, synchronization, and GUI development in C.

---

## 👤 Authors

**University Advanced C Programming Project — 2025**

- [Durdona-creator](https://github.com/Durdona-creator)
- [kezialawita](https://github.com/kezialawita)
