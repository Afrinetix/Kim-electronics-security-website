/* =================================================================
   KIM ELECTRONICS — AI Chatbot (Rule-Based with Lead Capture)
   ================================================================= */

'use strict';

const KB = {
  greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'habari', 'hujambo'],
  cctv: ['cctv', 'camera', 'cameras', 'surveillance', 'monitor', 'video', 'recording', 'ip camera', 'nvr', 'dvr'],
  fence: ['electric fence', 'electric fencing', 'fence', 'perimeter', 'energizer', 'fencing'],
  electrical: ['electrical', 'wiring', 'electrician', 'power', 'socket', 'switch', 'breaker', 'db board', 'distribution', 'rewiring'],
  alarm: ['alarm', 'intruder', 'motion sensor', 'siren', 'detector', 'burglar'],
  access: ['access control', 'fingerprint', 'biometric', 'door control', 'keypad', 'entry', 'face recognition'],
  smart: ['smart home', 'automation', 'smart lighting', 'smart lock', 'automate', 'control app', 'voice control'],
  music: ['music', 'sound system', 'speaker', 'audio', 'sound', 'pa system', 'amplifier'],
  network: ['network', 'wifi', 'internet', 'cable', 'router', 'cabling', 'lan', 'fibre'],
  intercom: ['intercom', 'video door', 'door phone', 'doorbell', 'visitor'],
  price: ['price', 'cost', 'how much', 'charge', 'rate', 'fee', 'quote', 'pricing', 'bei'],
  location: ['nairobi', 'mombasa', 'kisumu', 'eldoret', 'nakuru', 'thika', 'karen', 'westlands', 'cbd', 'kenya', 'where', 'location'],
  hours: ['hours', 'working hours', 'open', 'available', 'time', 'when'],
  contact: ['contact', 'phone', 'call', 'whatsapp', 'number', 'email', 'reach'],
  quote: ['quote', 'free quote', 'quotation', 'estimate', 'assessment'],
  maintenance: ['maintenance', 'service contract', 'repair', 'service', 'broken', 'not working', 'fix']
};

const RESPONSES = {
  greeting: [
    "Hello! 👋 I'm KimBot, your virtual assistant for Kim Electronics & Security Solutions. How can I help you today? I can answer questions about CCTV installation, electric fencing, electrical services, pricing, and more!",
    "Hi there! Welcome to Kim Electronics & Security Solutions 🔒⚡. I'm here to help with any questions about our security and electrical services. What can I assist you with?"
  ],
  cctv: `📷 **CCTV Camera Installation**\n\nWe install high-definition IP cameras for homes, offices, shops, and large commercial premises across Kenya.\n\n✅ 4K & HD camera options\n✅ Night vision & PTZ cameras\n✅ Remote viewing on your phone\n✅ DVR/NVR recording systems\n✅ Cloud & local storage\n\n**Pricing starts from KSh 18,000** for a basic 4-camera home system (installed). We offer free site surveys — shall I arrange one?`,
  fence: `⚡ **Electric Fence Installation**\n\nOur electric fence systems are Kenya's most reliable perimeter security option.\n\n✅ Residential & commercial fencing\n✅ Solar-powered energizer option\n✅ Alarm system integration\n✅ ERC-compliant installation\n\n**Pricing:** from KSh 1,200–2,000 per running metre (installed). A typical home fence costs KSh 95,000–180,000 depending on perimeter size.\n\nWould you like a free quote for your property?`,
  electrical: `🔌 **Electrical Wiring & Installation**\n\nOur licensed electricians handle all types of electrical work:\n\n✅ New build full wiring\n✅ Rewiring & DB board upgrades\n✅ Solar installation\n✅ Industrial & commercial wiring\n✅ ERC-compliant inspections\n\nWe're ERC-licensed and all work comes with a 12-month workmanship warranty.\n\nCall **0743 088 275** for a free assessment!`,
  alarm: `🔔 **Alarm Systems**\n\nOur alarm systems provide instant intrusion detection:\n\n✅ GSM & IP alarm panels\n✅ Motion & vibration sensors\n✅ Glass break detectors\n✅ Loud sirens & strobe lights\n✅ SMS/WhatsApp alerts to your phone\n\nPricing starts from **KSh 12,000** for a basic home alarm. Would you like more information?`,
  access: `🔐 **Access Control Systems**\n\nControl who enters your premises with biometric technology:\n\n✅ Fingerprint readers\n✅ Face recognition systems\n✅ Smart card / RFID access\n✅ Keypad entry\n✅ Automatic barrier gates\n✅ Time & attendance tracking\n\nPricing from **KSh 15,000** for a single-door system. We can install systems for any size — from a single office door to a large factory. Need a quote?`,
  smart: `🏠 **Smart Home Solutions**\n\nTransform your home with intelligent automation:\n\n✅ Smart lighting & scheduling\n✅ Automated gates & locks\n✅ Climate control\n✅ Security integration\n✅ Voice control (Alexa/Google)\n✅ Single app for everything\n\nSmart home packages start from **KSh 45,000**. Our team will design a custom solution for your home. Shall we arrange a free consultation?`,
  music: `🎵 **Music Systems & Sound Setup**\n\nProfessional audio solutions for any space:\n\n✅ Multi-zone home audio\n✅ Restaurant & hotel systems\n✅ In-ceiling & outdoor speakers\n✅ Bluetooth & smart integration\n✅ Conference room audio\n\nPricing depends on the size of space and equipment. Contact us for a tailored quote — call **0743 088 275**!`,
  network: `🌐 **Networking & WiFi Solutions**\n\n✅ Structured Cat 6/7 cabling\n✅ Enterprise WiFi deployment\n✅ Network switches & routing\n✅ Firewall configuration\n✅ CCTV network integration\n✅ ISP connectivity support\n\nPricing from **KSh 8,000** for basic setups. We handle networks for homes, offices, hotels, and schools. Want a site assessment?`,
  intercom: `📞 **Intercom Installation**\n\nModern intercom systems for apartments, offices, and gated estates:\n\n✅ Video door phones\n✅ Multi-apartment systems\n✅ Mobile app answering\n✅ Gate electric lock integration\n\nPricing from **KSh 10,000** for a single-unit video intercom. Need a quote for your building?`,
  price: `💰 **Pricing Overview**\n\nHere's a general guide:\n\n• CCTV (4 cameras): from **KSh 18,000**\n• Electric Fence (per metre): **KSh 1,200–2,000**\n• Alarm System: from **KSh 12,000**\n• Access Control: from **KSh 15,000**\n• Smart Home: from **KSh 45,000**\n• Electrical wiring: quoted by scope\n\n📋 For an accurate quote specific to your property, I recommend a **free site survey** — we come to you, assess, and provide a detailed written quote at no charge. Shall I arrange one?`,
  location: `📍 **Our Service Coverage**\n\nWe serve the **entire Kenya** including:\n- Nairobi & all suburbs (Karen, Westlands, Kilimani, etc.)\n- Mombasa, Kisumu, Nakuru, Eldoret\n- Thika, Machakos, Kitengela\n- And all 47 counties!\n\nWe'll travel to your location for site surveys and installations. Call **0743 088 275** to confirm availability in your specific area.`,
  hours: `🕐 **Business Hours**\n\n• Monday – Friday: **8:00 AM – 6:00 PM**\n• Saturday: **9:00 AM – 5:00 PM**\n• Sunday: Emergency only\n• Emergency support: **24/7**\n\nCall **0743 088 275** or WhatsApp us any time!`,
  contact: `📱 **Contact Kim Electronics**\n\n📞 Phone: **0743 088 275**\n💬 WhatsApp: **0743 088 275**\n📧 Email: info@kimelectronics.co.ke\n📍 Location: Nairobi, Kenya\n\nYou can also [click here](https://wa.me/254743088275) to open WhatsApp directly!`,
  quote: `📋 **Get a Free Quote**\n\nYou can request your free quote in 3 ways:\n\n1️⃣ Click the **"Get a Free Quote"** button on this page\n2️⃣ Call us on **0743 088 275**\n3️⃣ WhatsApp us on **0743 088 275**\n\nWe'll do a **free site survey** and provide a detailed written quote within 24 hours. No obligations!`,
  maintenance: `🔧 **Maintenance & Support**\n\nWe offer maintenance contracts for all our installations:\n\n✅ Quarterly system inspections\n✅ Camera cleaning & adjustment\n✅ Firmware updates\n✅ 24/7 emergency support\n✅ Priority response time\n\nContracts start from **KSh 3,000/month**. Ad-hoc service calls also available.\n\nFor immediate support, call **0743 088 275**.`,
  fallback: [
    "I'm not sure I fully understood that. Could you rephrase? You can ask me about CCTV, electric fencing, alarm systems, pricing, or how to get a quote.",
    "Thanks for your message! For the most accurate answer, I'd recommend calling us directly on **0743 088 275** or sending a WhatsApp. Our team is available Mon–Sat during business hours.",
    "That's a great question for our technical team! Please call **0743 088 275** or WhatsApp us for a detailed answer. We respond within 30 minutes during business hours."
  ]
};

const QUICK_REPLIES_INITIAL = [
  'CCTV Installation', 'Electric Fence', 'Get a Quote', 'Pricing', 'Our Location', 'Contact Us'
];

class KimChatbot {
  constructor() {
    this.toggle     = document.getElementById('chatbot-toggle');
    this.window     = document.getElementById('chatbot-window');
    this.messagesEl = document.getElementById('chatbot-messages');
    this.inputEl    = document.getElementById('chatbot-input');
    this.sendBtn    = document.getElementById('chatbot-send');
    this.closeBtn   = document.getElementById('chatbot-close');
    this.qrEl       = document.getElementById('quick-replies');
    this.isOpen     = false;
    this.hasGreeted = false;
    this.leadCaptured = false;

    if (!this.toggle) return;
    this.bind();
  }

  bind() {
    this.toggle.addEventListener('click', () => this.toggleChat());
    this.closeBtn?.addEventListener('click', () => this.closeChat());
    this.sendBtn?.addEventListener('click',  () => this.handleSend());
    this.inputEl?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.handleSend(); }
    });
  }

  toggleChat() {
    this.isOpen ? this.closeChat() : this.openChat();
  }

  openChat() {
    this.isOpen = true;
    this.window?.classList.add('open');
    this.toggle.setAttribute('aria-expanded', 'true');
    const icon = document.getElementById('chatbot-toggle-icon');
    if (icon) { icon.classList.remove('fa-robot'); icon.classList.add('fa-times'); }
    if (!this.hasGreeted) {
      this.hasGreeted = true;
      setTimeout(() => {
        this.addMessage('bot', this.pick(RESPONSES.greeting));
        setTimeout(() => this.showQuickReplies(QUICK_REPLIES_INITIAL), 600);
      }, 400);
    }
    setTimeout(() => this.inputEl?.focus(), 300);
  }

  closeChat() {
    this.isOpen = false;
    this.window?.classList.remove('open');
    this.toggle.setAttribute('aria-expanded', 'false');
    const icon = document.getElementById('chatbot-toggle-icon');
    if (icon) { icon.classList.add('fa-robot'); icon.classList.remove('fa-times'); }
  }

  handleSend() {
    const text = this.inputEl?.value.trim();
    if (!text) return;
    this.inputEl.value = '';
    this.addMessage('user', text);
    this.clearQuickReplies();
    this.showTyping();
    setTimeout(() => {
      this.hideTyping();
      const response = this.getResponse(text.toLowerCase());
      this.addMessage('bot', response);
      setTimeout(() => this.showContextReplies(text.toLowerCase()), 400);
    }, 900 + Math.random() * 600);
  }

  getResponse(text) {
    if (this.matchAny(text, KB.greetings)) return this.pick(RESPONSES.greeting);
    if (this.matchAny(text, KB.quote))      return RESPONSES.quote;
    if (this.matchAny(text, KB.price))      return RESPONSES.price;
    if (this.matchAny(text, KB.contact))    return RESPONSES.contact;
    if (this.matchAny(text, KB.hours))      return RESPONSES.hours;
    if (this.matchAny(text, KB.location))   return RESPONSES.location;
    if (this.matchAny(text, KB.maintenance)) return RESPONSES.maintenance;
    if (this.matchAny(text, KB.fence))      return RESPONSES.fence;
    if (this.matchAny(text, KB.cctv))       return RESPONSES.cctv;
    if (this.matchAny(text, KB.electrical)) return RESPONSES.electrical;
    if (this.matchAny(text, KB.alarm))      return RESPONSES.alarm;
    if (this.matchAny(text, KB.access))     return RESPONSES.access;
    if (this.matchAny(text, KB.smart))      return RESPONSES.smart;
    if (this.matchAny(text, KB.music))      return RESPONSES.music;
    if (this.matchAny(text, KB.network))    return RESPONSES.network;
    if (this.matchAny(text, KB.intercom))   return RESPONSES.intercom;
    return this.pick(RESPONSES.fallback);
  }

  showContextReplies(text) {
    let replies = [];
    if (this.matchAny(text, KB.cctv))       replies = ['Electric Fence', 'Alarm System', 'Get a Quote'];
    else if (this.matchAny(text, KB.fence)) replies = ['CCTV Installation', 'Alarm System', 'Pricing'];
    else if (this.matchAny(text, KB.price)) replies = ['Get a Quote', 'CCTV Installation', 'Electric Fence'];
    else replies = ['CCTV Installation', 'Electric Fence', 'Get a Quote', 'Pricing'];
    this.showQuickReplies(replies);
  }

  showQuickReplies(replies) {
    if (!this.qrEl) return;
    this.qrEl.innerHTML = '';
    replies.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply';
      btn.textContent = r;
      btn.addEventListener('click', () => {
        this.clearQuickReplies();
        this.addMessage('user', r);
        this.showTyping();
        setTimeout(() => {
          this.hideTyping();
          const response = this.getResponse(r.toLowerCase());
          this.addMessage('bot', response);
          setTimeout(() => this.showContextReplies(r.toLowerCase()), 400);
        }, 800);
      });
      this.qrEl.appendChild(btn);
    });
  }

  clearQuickReplies() {
    if (this.qrEl) this.qrEl.innerHTML = '';
  }

  addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    // Convert **bold** and newlines to HTML
    bubble.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:var(--blue-light)">$1</a>');
    const time = document.createElement('div');
    time.className = 'msg-time';
    time.textContent = this.getTime();
    div.appendChild(bubble);
    div.appendChild(time);
    this.messagesEl?.appendChild(div);
    this.scrollBottom();
  }

  showTyping() {
    const div = document.createElement('div');
    div.className = 'msg bot chatbot-typing';
    div.id = 'typing-indicator';
    div.innerHTML = '<div class="msg-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
    this.messagesEl?.appendChild(div);
    this.scrollBottom();
  }

  hideTyping() {
    document.getElementById('typing-indicator')?.remove();
  }

  scrollBottom() {
    if (this.messagesEl) this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  getTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' });
  }

  matchAny(text, keywords) {
    return keywords.some(kw => text.includes(kw));
  }

  pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

document.addEventListener('DOMContentLoaded', () => new KimChatbot());
