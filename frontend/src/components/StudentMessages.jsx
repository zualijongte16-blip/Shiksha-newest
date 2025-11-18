import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentMessages.css';

const StudentMessages = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Teachers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('All');

  // Mock data for chats
  const [chats] = useState({
    Teachers: [
      { id: 1, name: 'Mr. Sharma', subject: 'Mathematics - Class 9', lastMessage: 'Please review the homework.', unread: 2, online: true },
      { id: 2, name: 'Ms. Patel', subject: 'Physics - Class 10', lastMessage: 'Great job on the test!', unread: 0, online: false },
      { id: 3, name: 'Mrs. Gupta', subject: 'English - Class 9', lastMessage: 'Read chapter 5.', unread: 1, online: true },
    ],
    Classmates: [
      { id: 4, name: 'Alice', subject: 'Group Study', lastMessage: 'Can you share notes?', unread: 0, online: true },
      { id: 5, name: 'Bob', subject: 'Project Group', lastMessage: 'Meeting at 5 PM.', unread: 3, online: false },
    ],
    Groups: [
      { id: 6, name: 'Math Class 9 Group', subject: 'Mathematics', lastMessage: 'Announcement: Test tomorrow.', unread: 5, online: true },
      { id: 7, name: 'Science Club', subject: 'Science', lastMessage: 'New experiment!', unread: 0, online: false },
    ],
  });

  // Mock messages for selected chat
  const [messages] = useState([
    { id: 1, sender: 'teacher', text: 'Welcome to the class!', time: '10:00 AM', type: 'announcement' },
    { id: 2, sender: 'student', text: 'Thank you, sir.', time: '10:05 AM' },
    { id: 3, sender: 'teacher', text: 'Please submit assignment by tomorrow.', time: '10:10 AM' },
  ]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'student') {
      navigate('/login');
    }
  }, [navigate]);

  const filteredChats = chats[activeTab].filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(chat => {
    if (filter === 'Unread only') return chat.unread > 0;
    if (filter === 'Files shared') return chat.lastMessage.includes('file');
    if (filter === 'From teacher only') return activeTab === 'Teachers';
    return true;
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Mock send
      console.log('Sending:', messageInput);
      setMessageInput('');
    }
  };

  const handleNewMessage = () => {
    // Mock new message
    alert('New message functionality');
  };

  return (
    <div className={`student-messages ${darkMode ? 'dark' : ''}`}>
      <div className="messages-container">
        {/* Left Sidebar */}
        <aside className="messages-sidebar">
          <div className="sidebar-header">
            <input
              type="text"
              placeholder="Search teacher or subject"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <button onClick={handleNewMessage} className="new-message-btn">New Message</button>
          </div>
          <div className="tabs">
            {['Teachers', 'Classmates', 'Groups'].map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="filters">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All</option>
              <option>Unread only</option>
              <option>Files shared</option>
              <option>From teacher only</option>
            </select>
          </div>
          <div className="chat-list">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat === chat.id ? 'selected' : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="chat-avatar">{chat.name[0]}</div>
                <div className="chat-info">
                  <h4>{chat.name}</h4>
                  <p>{chat.subject}</p>
                  <p className="last-message">{chat.lastMessage}</p>
                </div>
                <div className="chat-meta">
                  {chat.unread > 0 && <span className="unread-count">{chat.unread}</span>}
                  <span className={`status ${chat.online ? 'online' : 'offline'}`}></span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Chat Window */}
        <main className="chat-window">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <h3>{chats[activeTab].find(c => c.id === selectedChat)?.name}</h3>
                <p>{chats[activeTab].find(c => c.id === selectedChat)?.subject}</p>
                <div className="menu">⋮</div>
              </div>
              <div className="chat-body">
                {messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.sender} ${msg.type === 'announcement' ? 'announcement' : ''}`}>
                    <div className="message-bubble">{msg.text}</div>
                    <span className="message-time">{msg.time}</span>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                <button>📎</button>
                <button onClick={handleSendMessage}>➤</button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">Select a chat to start messaging</div>
          )}
        </main>

        {/* Right Info Panel */}
        <aside className="info-panel">
          {selectedChat && (
            <>
              <div className="teacher-details">
                <h4>Teacher Details</h4>
                <p>Name: {chats[activeTab].find(c => c.id === selectedChat)?.name}</p>
                <p>Subject: {chats[activeTab].find(c => c.id === selectedChat)?.subject}</p>
                <p>Status: {chats[activeTab].find(c => c.id === selectedChat)?.online ? 'Active now' : 'Last seen at 8:30 PM'}</p>
              </div>
              <div className="shared-files">
                <h4>Shared Files</h4>
                <ul>
                  <li>Assignment.pdf</li>
                  <li>Notes.docx</li>
                </ul>
              </div>
              <div className="quick-access">
                <h4>Quick Access</h4>
                <button>View Assignments</button>
                <button>Take Quiz</button>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Dark Mode Toggle */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default StudentMessages;
