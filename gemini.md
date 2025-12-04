# Gemini Specification – Physical AI & Humanoid Robotics Textbook

## Project Overview
**Name:** Physical AI & Humanoid Robotics  
**Objective:** AI-native textbook teaching Physical AI & Humanoid Robotics, with embedded RAG chatbot, personalized content, and Urdu translation.  
**Platform:** Docusaurus → GitHub Pages  
**Audience:** Students, AI enthusiasts, robotics professionals  

---

## Book Structure & Chapters
1. **Introduction** – Robotics evolution, Physical AI vs Digital AI, human-robot collaboration  
2. **Humanoid Basics** – Anatomy, actuators, sensors, kinematics, dynamics  
3. **Perception & Sensing** – Vision, LiDAR, tactile sensors, sensor fusion  
4. **Control & Motion Planning** – Classical & AI-based control, trajectory optimization  
5. **Human-Robot Interaction** – Ethics, collaborative robots, social intelligence  
6. **AI Integration** – Embedding AI agents, multi-agent systems, real-world deployment  
7. **Projects & Labs** – Build a humanoid, motion control lab, AI task execution  
8. **Future Trends** – Swarm robotics, BCIs, Physical AI in industry & healthcare  

---

## Features

**RAG Chatbot**  
- Embedded via Claude Code Agent  
- Answers questions from user-selected text  
- Supports English & Urdu  

**User Personalization**  
- Signup/Signin via [Better-Auth](https://www.better-auth.com/)  
- Profile inputs: Software/hardware background, learning goals  
- Dynamic content adjustment per chapter  

**Multilingual Support**  
- Toggle chapters between English & Urdu  

**Reusable Intelligence**  
- Claude Code subagents & agent skills for simulations, math, and code snippets  

---

## Tech Stack
| Component | Technology |
|-----------|-----------|
| Authoring | Claude Code + Spec-Kit Plus |
| Deployment | Docusaurus → GitHub Pages |
| RAG Chatbot | OpenAI Agents/ChatKit SDKs, FastAPI, Neon Postgres, Qdrant |
| Authentication | Better-Auth |
| Translation | Claude Code translation agents |
| Personalization | Dynamic chapter rendering |

---

## Directory Structure
physical-ai-humanoid-robotics/
├── docs/ # Chapter markdowns
├── src/components/ # RagChatbot, PersonalizationPanel, LanguageToggle
├── src/assets/images/ # Illustrations
├── gemini.md # This file
└── docusaurus.config.js