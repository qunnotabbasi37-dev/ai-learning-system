"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
type Msg = { who: string; text: string; img?: string; opts?: string[]; ans?: number };
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState("login");
  const [selected, setSelected] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, [screen]);
  const enterLab = async () => {
    if (!name || !email || !age) return alert("Saare boxes bharo!");
    setLoading(true);
    await supabase.from("students").insert([{ name, email, age: Number(age) }]);
    setLoading(false); setScreen("lab");
  };
  const courses = [
    { title: "HTML Mastery", level: "Beginner", img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800", qs: [
      { q: "HTML ka full form kya hai?", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800", opts: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Management"], ans: 0 },
      { q: "HTML me sab se bara heading kaunsa hai?", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", opts: ["<h1>", "<h6>", "<head>"], ans: 0 },
      { q: "Image lagane ke liye kaunsa tag?", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800", opts: ["<img>", "<image>", "<pic>"], ans: 0 },
      { q: "Link banane ke liye kaunsa tag?", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", opts: ["<a>", "<link>", "<href>"], ans: 0 },
      { q: "HTML ka latest version?", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800", opts: ["HTML5", "HTML2", "HTML9"], ans: 0 },
    ]},
    { title: "CSS Magic", level: "Intermediate", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800", qs: [
      { q: "Is image me color kis se lag raha hai?", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", opts: ["CSS se", "HTML se", "JS se"], ans: 0 },
      { q: "Flexbox kis liye use hota hai?", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", opts: ["Layout banane ke liye", "Image hatane ke liye", "Text delete karne ke liye"], ans: 0 },
      { q: "Ye gradient background kis se banta hai?", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800", opts: ["CSS background", "HTML tag", "Python"], ans: 0 },
      { q: "CSS me class ko kaise target karte hain?", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", opts: [". (dot) se", "# (hash) se", "@ se"], ans: 0 },
      { q: "CSS ka full form?", img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800", opts: ["Cascading Style Sheets", "Computer Style System", "Creative Style Sheet"], ans: 0 },
    ]},
    { title: "JavaScript Pro", level: "Advanced", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800", qs: [
      { q: "JS me variable kaise banate hain?", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800", opts: ["let, const, var se", "make var se", "create se"], ans: 0 },
      { q: "Ye console.log kya karta hai?", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800", opts: ["Console me print karta hai", "Image delete karta hai", "CSS lagata hai"], ans: 0 },
      { q: "Button click pe kaam kaise hota hai?", img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800", opts: ["onClick se", "onHover se", "onDelete se"], ans: 0 },
      { q: "JS kis kaam aata hai?", img: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800", opts: ["Website ko chalane ke liye", "Photo khinchne ke liye", "Khana banane ke liye"], ans: 0 },
      { q: "JS ka latest version?", img: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800", opts: ["ES6+", "HTML5", "CSS4"], ans: 0 },
    ]},
    { title: "Python Core", level: "Beginner", img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800", qs: [
      { q: "Python me print kaise karte hain?", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800", opts: ["print()", "echo()", "show()"], ans: 0 },
      { q: "Python kya hai?", img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800", opts: ["Ek programming language", "Ek saanp hi", "Ek game"], ans: 0 },
      { q: "Python me list kaise banate hain?", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800", opts: ["[1,2,3] se", "(1,2,3) se", "{1,2,3} se"], ans: 0 },
      { q: "Python aasan hai?", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800", opts: ["Bohat aasan!", "Bohat mushkil", "Pata nahi"], ans: 0 },
      { q: "Python se kya banta hai?", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", opts: ["AI, Website, Game sab!", "Sirf photo", "Kuch nahi"], ans: 0 },
    ]},{ title: "AI Tools Hub", level: "Beginner", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", qs: [
      { q: "AI ka full form?", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", opts: ["Artificial Intelligence", "Automatic Internet", "Amazing Idea"], ans: 0 },
      { q: "ChatGPT kya hai?", img: "https://images.unsplash.com/photo-1620712943542-bcc4688e7485?w=800", opts: ["AI Chatbot", "TV Channel", "Game"], ans: 0 },
      { q: "AI seekhta kaise hai?", img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800", opts: ["Data se", "Neend se", "Khaane se"], ans: 0 },
      { q: "AI se kya bana sakte ho?", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800", opts: ["Kahani, Photo, Video sab!", "Sirf khana", "Kuch nahi"], ans: 0 },
      { q: "AI ka sab se famous tool?", img: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?w=800", opts: ["ChatGPT", "Paint", "Calculator"], ans: 0 },
    ]},
    { title: "Tailwind CSS", level: "Intermediate", img: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800", qs: [
      { q: "Tailwind kya hai?", img: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800", opts: ["CSS ka framework", "Ek hawa", "Ek car"], ans: 0 },
      { q: "Tailwind me class kaise likhte hain?", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800", opts: ["className='bg-red-500'", "style='red'", "color='red'"], ans: 0 },
      { q: "Tailwind se kya faida?", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800", opts: ["Jaldi design banta hai", "Kuch nahi", "Slow hota hai"], ans: 0 },
      { q: "Padding ke liye class?", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800", opts: ["p-4", "padding-4", "pad-4"], ans: 0 },
      { q: "Tailwind kis ke saath use hota hai?", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800", opts: ["React / HTML ke saath", "Sirf Python", "Sirf Photo"], ans: 0 },
    ]},
    { title: "Node.js", level: "Advanced", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800", qs: [
      { q: "Node.js kya hai?", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800", opts: ["JS ko computer pe chalane wala", "Ek ped", "Ek website"], ans: 0 },
      { q: "Node.js kis language me hai?", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800", opts: ["JavaScript", "Python", "HTML"], ans: 0 },
      { q: "Node se kya banta hai?", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", opts: ["Backend / Server", "Photo", "Video"], ans: 0 },
      { q: "npm kya hai?", img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800", opts: ["Package Manager", "Ek game", "Ek photo app"], ans: 0 },
      { q: "Node me server kaise banate hain?", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", opts: ["http module se", "HTML se", "CSS se"], ans: 0 },
    ]},
    { title: "Git & GitHub", level: "Expert", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", qs: [
      { q: "Git kis kaam aata hai?", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", opts: ["Code save karne ke liye", "Game khelne ke liye", "Photo ke liye"], ans: 0 },
      { q: "GitHub kya hai?", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800", opts: ["Code rakhne ki website", "Ek game", "Ek shop"], ans: 0 },
      { q: "Commit ka matlab?", img: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800", opts: ["Code save karna", "Phone karna", "Band karna"], ans: 0 },
      { q: "Push ka matlab?", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800", opts: ["GitHub pe bhejna", "Phone phenkna", "Delete karna"], ans: 0 },
      { q: "Pull ka matlab?", img: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800", opts: ["GitHub se lena", "Rassi khinchna", "Band karna"], ans: 0 },
    ]},
    { title: "UI/UX Design", level: "Intermediate", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800", qs: [
      { q: "UI ka matlab?", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800", opts: ["User Interface - Jo dikhta hai", "Ek phone", "Ek app"], ans: 0 },
      { q: "UX ka matlab?", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800", opts: ["User Experience - Kaisa lagta hai", "Ek car", "Ek color"], ans: 0 },
      { q: "Acha design kaisa hota hai?", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800", opts: ["Aasan aur pyara", "Mushkil aur ganda", "Pata nahi"], ans: 0 },
      { q: "Figma kya hai?", img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800", opts: ["Design banane wala tool", "Ek game", "Ek khana"], ans: 0 },
      { q: "Color ka kya kaam?", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800", opts: ["Feeling dikhana", "Kuch nahi", "Sirf chamak"], ans: 0 },
    ]},
  ];
  const startChat = (idx: number) => {
    setSelected(idx); setQIndex(0); setScore(0); setFinished(false);
    const c = courses[idx];
    setMsgs([{ who: "ai", text: `Hi ${name}! Main tumhara AI Teacher hun. Chalo ${c.title} start karte hain!` }, { who: "q", text: c.qs[0].q, img: c.qs[0].img, opts: c.qs[0].opts, ans: c.qs[0].ans }]);
    setScreen("chat");
  };
  const answer = (oi: number) => {
    const c = courses[selected]; const cur = c.qs[qIndex];
    const ok = oi === cur.ans; const ns = ok ? score + 1 : score;
    if (ok) setScore(ns);
    const nm: Msg[] = [...msgs, { who: "user", text: cur.opts[oi] }, { who: "ai", text: ok ? "Wah! Bilkul sahi! 🎉" : "Sahi jawab: " + cur.opts[cur.ans] }];
    if (qIndex + 1 < c.qs.length) {
      const n = c.qs[qIndex + 1];
      nm.push({ who: "q", text: n.q, img: n.img, opts: n.opts, ans: n.ans });
      setQIndex(qIndex + 1); setMsgs(nm);
      setTimeout(() => window.scrollTo({ top: 9999, behavior: "smooth" }), 100);
    } else { setMsgs(nm); setFinished(true); (window as any).FS = ns; }
  };
  const inp = { width: "100%", padding: 15, marginBottom: 14, borderRadius: 30, border: "1px solid rgba(255,255,255,0.15)", fontSize: 15, background: "#2a3566", color: "white", outline: "none", boxSizing: "border-box" as const };
  const wBtn = { width: "100%", padding: 15, borderRadius: 30, border: "none", background: "white", color: "#1a2348", fontSize: 16, fontWeight: "bold" as const, cursor: "pointer" };
  if (screen === "chat") {
    const c = courses[selected];
    if (finished) {
      const fs = (window as any).FS ?? score;
      return <div style={{ minHeight: "100vh", background: "#1a2348", display: "flex", justifyContent: "center", alignItems: "center", padding: 20, fontFamily: "Arial" }}><div style={{ width: "100%", maxWidth: 420, background: "#2a3566", borderRadius: 20, padding: 30, textAlign: "center" }}><h1 style={{ color: "white", margin: 0 }}>CONGRATULATIONS</h1><p style={{ color: "#ffd6e8" }}>{name}! You Slayed!</p><h1 style={{ color: "white" }}>{fs}/{c.qs.length}</h1><button onClick={() => setScreen("lab")} style={wBtn}>Back to Dashboard</button></div></div>;
    }
    return <div style={{ background: "#0a0f24", fontFamily: "Arial", padding: 15, paddingBottom: 100 }}><div style={{ maxWidth: 520, margin: "auto" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}><button onClick={() => setScreen("lab")} style={{ padding: "8px 16px", borderRadius: 30, border: "none", background: "#1a2348", color: "white", cursor: "pointer" }}>← Back</button><b style={{ color: "white" }}>🤖 {c.title}</b><span style={{ color: "white", fontSize: 12 }}>{qIndex + 1}/{c.qs.length}</span></div>
      {msgs.map((m, i) => {
        if (m.who === "ai") return <div key={i} style={{ background: "#1a2348", color: "white", padding: 12, borderRadius: 15, maxWidth: "85%", marginBottom: 10, fontSize: 14 }}>{m.text}</div>;
        if (m.who === "user") return <div key={i} style={{ background: "white", color: "#1a2348", padding: 10, borderRadius: 15, maxWidth: "70%", marginLeft: "auto", marginBottom: 10, fontSize: 14, textAlign: "right" }}>{m.text}</div>;
        return <div key={i} style={{ background: "#1a2348", borderRadius: 18, padding: 14, marginBottom: 10 }}><img src={m.img} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12, marginBottom: 10 }} /><p style={{ color: "white", fontWeight: "bold", marginTop: 0 }}>{m.text}</p>{m.opts?.map((o, oi) => <button key={oi} onClick={() => { if (i === msgs.length - 1) answer(oi); }} style={{ width: "100%", padding: 11, borderRadius: 30, border: "1px solid rgba(255,255,255,0.2)", background: "#2a3566", color: "white", marginBottom: 8, textAlign: "left", cursor: "pointer" }}>◉ {o}</button>)}</div>;
      })}</div></div>;
  }
  if (screen === "lab") {
    return <div style={{ background: "#0a0f24", padding: 16, paddingBottom: 80, fontFamily: "Arial", minHeight: "100vh" }}><div style={{ maxWidth: 1000, margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}><h2 style={{ color: "white", margin: 0, letterSpacing: 2 }}>🌸 ALAES</h2><span style={{ color: "white", fontSize: 13 }}>Hi, {name}</span></div>
      <h1 style={{ color: "white", fontSize: 26 }}>Your Lab, <span style={{ color: "#ff8fb3" }}>{name}</span></h1>
      <p style={{ color: "#aab4ff", fontSize: 13 }}>Mouse card pe le jao — Card hilega! 👇</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
        {courses.map((c, idx) => {
          const h = hover === idx;
          return <div key={idx} onClick={() => startChat(idx)} onMouseEnter={() => setHover(idx)} onMouseLeave={() => setHover(null)} style={{ background: "#1a2348", borderRadius: 20, overflow: "hidden", cursor: "pointer", transform: h ? "translateY(-10px) scale(1.04)" : "scale(1)", boxShadow: h ? "0 20px 40px rgba(255,143,179,0.4)" : "0 4px 10px rgba(0,0,0,0.3)", border: h ? "2px solid #ff8fb3" : "2px solid transparent", transition: "all 0.3s ease" }}>
            <div style={{ position: "relative", height: 140, overflow: "hidden" }}><img src={c.img} style={{ width: "100%", height: "100%", objectFit: "cover", transform: h ? "scale(1.1)" : "scale(1)", transition: "0.3s" }} /><span style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.6)", color: "white", fontSize: 11, padding: "4px 10px", borderRadius: 20 }}>{c.level}</span><div style={{ position: "absolute", bottom: 10, left: 12, color: "white", fontWeight: "bold", textShadow: "0 2px 8px black" }}>{c.title}</div></div>
            <div style={{ padding: 12 }}><button onClick={(e) => { e.stopPropagation(); startChat(idx); }} style={{ width: "100%", padding: 12, borderRadius: 30, border: "none", background: h ? "#ff8fb3" : "white", color: h ? "white" : "#1a2348", fontWeight: "bold", cursor: "pointer" }}>Start AI Chat</button></div>
          </div>;
        })}
      </div>
      <button onClick={() => setScreen("login")} style={{ width: "100%", padding: 12, borderRadius: 30, border: "1px solid white", background: "transparent", color: "white", marginTop: 20, cursor: "pointer" }}>Back / Logout</button>
    </div></div>;
  }
  return <div style={{ minHeight: "100vh", background: "#0a0f24", display: "flex", justifyContent: "center", alignItems: "center", padding: 20, fontFamily: "Arial" }}><div style={{ width: "100%", maxWidth: 420, background: "#1a2348", borderRadius: 24, padding: 30, textAlign: "center" }}><h1 style={{ color: "white", fontSize: 32, letterSpacing: 6, margin: 0, fontWeight: 900 }}>ALAES</h1><p style={{ color: "#d0d6ff", fontSize: 13, marginTop: 10, marginBottom: 24 }}>Socho, Seekho, Banao - Future Apna</p><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" style={inp} /><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inp} /><input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" type="number" style={inp} /><button onClick={enterLab} style={wBtn}>{loading ? "Ja raha hai..." : "Enter Lab 🚀"}</button></div></div>;
}