import { useState } from 'react';
import Mainlayout from '../components/layout/Mainlayout';
import { Search, Send, Phone, Video, MoreVertical, Circle } from 'lucide-react';

const Messages = () => {
  // Mock Data for Demo
  const contacts = [
    { id: 1, name: 'Dr. Sarah Smith', role: 'Cardiologist', active: true, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', lastMsg: 'Your test results look good.' },
    { id: 2, name: 'Nutritionist Mike', role: 'Diet Coach', active: false, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', lastMsg: 'Remember to track your water intake!' },
    { id: 3, name: 'Wellness Support', role: 'Customer Care', active: false, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support', lastMsg: 'How can we help you today?' },
  ];

  const [activeChat, setActiveChat] = useState(contacts[0]);
  const [messageInput, setMessageInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'them', text: 'Hello! I reviewed your weekly activity.', time: '09:41 AM' },
    { sender: 'them', text: 'Great job hitting your step goals yesterday!', time: '09:42 AM' },
    { sender: 'me', text: 'Thanks, Dr. Sarah! I felt really energetic.', time: '09:45 AM' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    setChatHistory([...chatHistory, { sender: 'me', text: messageInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMessageInput('');
  };

  return (
    <Mainlayout>
      <div className="h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm border border-gray-200 flex overflow-hidden">
        
        {/* Contacts Sidebar */}
        <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => setActiveChat(contact)}
                className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${activeChat.id === contact.id ? 'bg-indigo-50 border-r-2 border-primary' : ''}`}
              >
                <div className="relative">
                  <img src={contact.img} alt={contact.name} className="w-10 h-10 rounded-full bg-gray-200" />
                  {contact.active && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">{contact.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{contact.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area (Hidden on mobile in list view, shown via logic in real app) */}
        <div className="hidden md:flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={activeChat.img} alt={activeChat.name} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-bold text-gray-800">{activeChat.name}</h3>
                <p className="text-xs text-primary font-medium">{activeChat.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <Phone size={20} className="hover:text-primary cursor-pointer" />
              <Video size={20} className="hover:text-primary cursor-pointer" />
              <MoreVertical size={20} className="hover:text-gray-600 cursor-pointer" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                  msg.sender === 'me' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input 
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button type="submit" className="p-3 bg-primary text-white rounded-xl hover:bg-indigo-700 transition-colors">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Messages;