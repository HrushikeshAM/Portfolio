import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ChevronRight, CornerDownLeft } from 'lucide-react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { text: "Welcome to Hrushikesh's interactive DevOps Shell v1.2.0", type: "system" },
    { text: "Type 'help' and press Enter to view all available commands.", type: "system" },
    { text: "", type: "empty" }
  ]);
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: [
      "Available commands:",
      "  about        Display summary about Hrushikesh A Menon",
      "  skills       Print core DevOps, Cloud & Web dev skill sets",
      "  projects     List details of key highlighted projects",
      "  resume       Trigger download of Hrushikesh's PDF resume",
      "  github       Link to GitHub profile (https://github.com/HrushikeshAM)",
      "  linkedin     Link to LinkedIn (linkedin.com/in/hrushikesh-a-menon-13569b268)",
      "  email        Display email address",
      "  clear        Clear the screen terminal history",
      "  sudo hack    [Warning] Restricted access"
    ],
    about: [
      "Hrushikesh A Menon - DevOps & Cloud Computing Specialist",
      "---------------------------------------------------------",
      "Education: MCA in CC & DevOps (Chandigarh University, 2024-2026 | CGPA: 8.05)",
      "Location: Bengaluru, India",
      "Summary: Detail-oriented professional specializing in Python, containerization",
      "         (Docker & Kubernetes), cloud orchestration, and automated workflows.",
      "         Passionate about optimizing infrastructure reliability and scalability."
    ],
    skills: [
      "Core Skills Inventory:",
      "---------------------",
      "• Containerization: Docker, Kubernetes",
      "• Cloud Services  : Amazon Web Services (AWS)",
      "• Languages       : Python, JavaScript, TypeScript, Java, SQL",
      "• Web Dev Stack   : MongoDB, Express.js, React.js, Node.js (MERN)",
      "• Automation/Ops  : Git, CI/CD, GitOps (ArgoCD), Shell Scripting"
    ],
    projects: [
      "Key Projects:",
      "-------------",
      "1. Self-Healing Cloud (SHC) - Jan 2026",
      "   Stack: Node.js, React, REST APIs, ML rules",
      "   Desc : Real-time cloud monitor with rule-based auto-remediation and recovery.",
      "   Url  : https://github.com/HrushikeshAM/Self-Healing-Cloud",
      "",
      "2. H.E.A.L. (Hospital Management System) - Feb 2023",
      "   Stack: MERN (MongoDB, Express, React, Node)",
      "   Desc : Full-stack admin, doctor, and patient registry with API auth.",
      "   Url  : https://github.com/HrushikeshAM/HEAL",
      "",
      "3. Cowrie Honeypot deployment",
      "   Stack: Python, Linux security, container auditing",
      "   Desc : Medium-interaction SSH/Telnet honeypot tracking malicious terminal inputs."
    ],
    email: ["Email: Hrushikesh.amenon@gmail.com"],
    github: ["Opening GitHub profile... (https://github.com/HrushikeshAM)"],
    linkedin: ["Opening LinkedIn profile... (linkedin.com/in/hrushikesh-a-menon-13569b268)"],
    resume: ["Downloading resume..."]
  };

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    const newHistory = [...history, { text: `guest@hrushikesh-devops:~$ ${cmdText}`, type: 'input' }];

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'sudo hack') {
      setHistory([
        ...newHistory,
        { text: "Accessing root nodes... FAILED.", type: "error" },
        { text: "Initiating Cowrie Honeypot logging...", type: "warning" },
        { text: "Warning: Your IP has been flagged. Just kidding! 😉 But Hrushikesh does build secure infrastructure.", type: "success" }
      ]);
      return;
    }

    if (trimmed === '') {
      setHistory([...newHistory]);
      return;
    }

    if (commands[trimmed]) {
      const outputLines = commands[trimmed].map(line => ({ text: line, type: 'output' }));
      setHistory([...newHistory, ...outputLines]);

      // Handle actual side effects
      if (trimmed === 'github') {
        window.open('https://github.com/HrushikeshAM', '_blank');
      } else if (trimmed === 'linkedin') {
        window.open('https://linkedin.com/in/hrushikesh-a-menon-13569b268/', '_blank');
      } else if (trimmed === 'resume') {
        const link = document.createElement('a');
        link.href = '/Hrushikesh_A_Menon_Resume.pdf';
        link.download = 'Hrushikesh_A_Menon_Resume.pdf';
        link.click();
      }
    } else {
      setHistory([
        ...newHistory,
        { text: `Command not found: '${cmdText}'. Type 'help' for available commands.`, type: 'error' }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // Focus terminal input on clicking anywhere inside the console card
  const focusTerminalInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="terminal-window"
      onClick={focusTerminalInput}
      id="devops-terminal"
    >
      {/* Terminal Header */}
      <div className="terminal-bar">
        <div className="terminal-dots">
          <div className="terminal-dot close" />
          <div className="terminal-dot minimize" />
          <div className="terminal-dot expand" />
        </div>
        <div className="terminal-title">
          <TerminalIcon style={{ width: '14px', height: '14px' }} />
          <span>sh - hrushikesh@devops-node</span>
        </div>
        <div style={{ width: '40px' }} /> {/* Spacer */}
      </div>

      {/* Terminal Screen */}
      <div ref={terminalBodyRef} className="terminal-body">
        {history.map((line, idx) => {
          if (line.type === 'input') {
            return (
              <div key={idx} className="terminal-line-msg input">
                <span className="terminal-prompt">guest@hrushikesh-devops:~$</span>
                &nbsp;{line.text.replace('guest@hrushikesh-devops:~$ ', '')}
              </div>
            );
          } else if (line.type === 'error') {
            return (
              <div key={idx} className="terminal-line-msg error">
                {line.text}
              </div>
            );
          } else if (line.type === 'warning') {
            return (
              <div key={idx} className="terminal-line-msg warning">
                {line.text}
              </div>
            );
          } else if (line.type === 'success') {
            return (
              <div key={idx} className="terminal-line-msg success">
                {line.text}
              </div>
            );
          } else if (line.type === 'system') {
            return (
              <div key={idx} className="terminal-line-msg system">
                {line.text}
              </div>
            );
          } else if (line.type === 'empty') {
            return <div key={idx} style={{ height: '4px' }} />;
          } else {
            return (
              <pre key={idx} className="terminal-line-msg output">
                {line.text}
              </pre>
            );
          }
        })}
      </div>

      {/* Input Prompt Footer */}
      <form onSubmit={handleSubmit} className="terminal-input-row">
        <ChevronRight style={{ width: '16px', height: '16px', color: '#6366f1' }} />
        <span className="terminal-prompt">guest@hrushikesh-devops:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input-element"
          placeholder="type 'help'..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <div className="terminal-enter-icon">
          <span>Enter</span>
          <CornerDownLeft style={{ width: '12px', height: '12px' }} />
        </div>
      </form>
    </div>
  );
};

export default Terminal;
