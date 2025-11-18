import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherMessages.css';

const TeacherMessages = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Chats');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [isTyping, setIsTyping] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);

  // Mock data for chats
  const [chats] = useState({
    'All Chats': [
      { id: 1, name: 'Alice Johnson', subject: 'Mathematics - Class 10', lastMessage: 'Thank you for the notes!', unread: 0, online: true, type: 'individual' },
      { id: 2, name: 'Bob Smith', subject: 'Physics - Class 10', lastMessage: 'Can you explain this?', unread: 2, online: false, type: 'individual' },
      { id: 3, name: 'Class 10 - Mathematics', subject: 'Mathematics', lastMessage: 'Homework due tomorrow.', unread: 5, online: true, type: 'group' },
      { id: 4, name: 'Class 11 - Physics', subject: 'Physics', lastMessage: 'Lab report submitted.', unread: 0, online: false, type: 'group' },
    ],
    'Class Groups': [
      { id: 3, name: 'Class 10 - Mathematics', subject: 'Mathematics', lastMessage: 'Homework due tomorrow.', unread: 5, online: true, type: 'group' },
      { id: 4, name: 'Class 11 - Physics', subject: 'Physics', lastMessage: 'Lab report submitted.', unread: 0, online: false, type: 'group' },
      { id: 5, name: 'Class 9 - English', subject: 'English', lastMessage: 'New assignment posted.', unread: 1, online: true, type: 'group' },
    ],
    'Individual': [
      { id: 1, name: 'Alice Johnson', subject: 'Mathematics - Class 10', lastMessage: 'Thank you for the notes!', unread: 0, online: true, type: 'individual' },
      { id: 2, name: 'Bob Smith', subject: 'Physics - Class 10', lastMessage: 'Can you explain this?', unread: 2, online: false, type: 'individual' },
      { id: 6, name: 'Charlie Brown', subject: 'English - Class 11', lastMessage: 'Great essay!', unread: 0, online: true, type: 'individual' },
    ],
  });

  // Mock messages for selected chat
  const [messages] = useState([
    { id: 1, sender: 'teacher', text: 'Welcome to the class!', time: '10:00 AM', type: 'announcement', reactions: ['👍', '❤️'] },
    { id: 2, sender: 'student', text: 'Thank you, sir.', time: '10:05 AM', reactions: [] },
    { id: 3, sender: 'teacher', text: 'Please submit assignment by tomorrow.', time: '10:10 AM', reactions: ['✅'] },
    { id: 4, sender: 'student', text: 'Here is my assignment.', time: '10:15 AM', attachment: 'assignment.pdf', reactions: [] },
  ]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    const userType = localStorage.getItem('userType');
    if (token === "" || userType !== 'teacher') {
      navigate('/login');
    }
  }, [navigate]);

  const filteredChats = chats[activeTab].filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(chat => {
    if (filter === 'Unread only') return chat.unread > 0;
    if (filter === 'Files shared') return chat.lastMessage.includes('file') || messages.some(m => m.attachment);
    if (filter === 'From teacher only') return chat.type === 'group';
    return true;
  }).filter(chat => {
    if (selectedClass !== 'All') return chat.subject.includes(selectedClass);
    if (selectedSubject !== 'All') return chat.subject.includes(selectedSubject);
    return true;
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Mock send
      console.log('Sending:', messageInput);
      setMessageInput('');
      setIsTyping(false);
    }
  };

  const handleNewMessage = () => {
    // Mock new message
    alert('New message functionality');
  };

  const handleAttachFile = () => {
    // Mock file attachment
    alert('Attach file functionality');
  };

  const handleVoiceNote = () => {
    // Mock voice note
    alert('Voice note functionality');
  };

  const handlePinMessage = (messageId) => {
    if (pinnedMessages.includes(messageId)) {
      setPinnedMessages(pinnedMessages.filter(id => id !== messageId));
    } else {
      setPinnedMessages([...pinnedMessages, messageId]);
    }
  };

  const handleSearchWithinChat = () => {
    // Mock search within chat
    alert('Search within chat functionality');
  };

  return (
    <div className={`teacher-messages ${darkMode ? 'dark' : ''}`}>
      <div className="messages-container">
        {/* Left Sidebar */}
        <aside className="messages-sidebar">
          <div className="sidebar-header">
            <input
              type="text"
              placeholder="Search students or groups"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <button onClick={handleNewMessage} className="new-message-btn">+ New Chat</button>
          </div>
          <div className="tabs">
            {['All Chats', 'Class Groups', 'Individual'].map(tab => (
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
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option>All</option>
              <option>Class 9</option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
              <option>All</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>English</option>
              <option>Science</option>
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
                <div>
                  <h3>{chats[activeTab].find(c => c.id === selectedChat)?.name}</h3>
                  <p>{chats[activeTab].find(c => c.id === selectedChat)?.subject}</p>
                  {isTyping && <p className="typing-indicator">Student is typing...</p>}
                </div>
                <div className="menu">⋮</div>
              </div>
              {pinnedMessages.length > 0 && (
                <div className="pinned-messages">
                  <h4>Pinned Messages</h4>
                  {pinnedMessages.map(id => (
                    <div key={id} className="pinned-message">
                      {messages.find(m => m.id === id)?.text}
                    </div>
                  ))}
                </div>
              )}
              <div className="chat-body">
                {messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.sender} ${msg.type === 'announcement' ? 'announcement' : ''}`}>
                    <div className="message-bubble">
                      {msg.text}
                      {msg.attachment && <div className="attachment">📎 {msg.attachment}</div>}
                      <div className="message-reactions">
                        {msg.reactions.map((reaction, index) => (
                          <span key={index} className="reaction">{reaction}</span>
                        ))}
                      </div>
                    </div>
                    <span className="message-time">{msg.time}</span>
                    <button onClick={() => handlePinMessage(msg.id)} className="pin-btn">📌</button>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    setIsTyping(true);
                    setTimeout(() => setIsTyping(false), 2000);
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                <button onClick={handleAttachFile}>📎</button>
                <button onClick={handleVoiceNote}>🎤</button>
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
              <div className="student-details">
                <h4>Student/Group Details</h4>
                <p>Name: {chats[activeTab].find(c => c.id === selectedChat)?.name}</p>
                <p>Subject: {chats[activeTab].find(c => c.id === selectedChat)?.subject}</p>
                <p>Status: {chats[activeTab].find(c => c.id === selectedChat)?.online ? 'Active now' : 'Last seen at 8:30 PM'}</p>
              </div>
              <div className="shared-files">
                <h4>Shared Files</h4>
                <ul>
                  <li>Assignment.pdf</li>
                  <li>Notes.docx</li>
                  <li>Lab_Report.pdf</li>
                </ul>
              </div>
              <div className="notes-section">
                <h4>Notes/Remarks</h4>
                <textarea placeholder="Add notes about this student/group..."></textarea>
              </div>
              <div className="quick-access">
                <h4>Quick Access</h4>
                <button>View Profile</button>
                <button>Mute Chat</button>
                <button>Report</button>
                <button>Delete Chat</button>
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

export default TeacherMessages;
