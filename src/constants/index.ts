export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};

export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

export const recentSessions = [
  {
    $id: "1",
    subject: "science" as Subject,
    name: "Neura the Brainy Explorer",
    topic: "Neural Network of the Brain",
    duration: 45,
    bookmarked: false,
    color: "#E5D0FF",
  },
  {
    $id: "2",
    subject: "maths" as Subject,
    name: "Countsy the Number Wizard",
    topic: "Derivatives & Integrals",
    duration: 30,
    bookmarked: false,
    color: "#FFDA6E",
  },
  {
    $id: "3",
    subject: "language" as Subject,
    name: "Verba the Vocabulary Builder",
    topic: "English Literature",
    duration: 30,
    bookmarked: false,
    color: "#BDE7FF",
  },
  {
    $id: "4",
    subject: "coding" as Subject,
    name: "Codey the Logic Hacker",
    topic: "Intro to If-Else Statements",
    duration: 45,
    bookmarked: false,
    color: "#FFC8E4",
  },
  {
    $id: "5",
    subject: "history" as Subject,
    name: "Memo, the Memory Keeper",
    topic: "World Wars: Causes & Consequences",
    duration: 15,
    bookmarked: false,
    color: "#FFECC8",
  },
  {
    $id: "6",
    subject: "economics" as Subject,
    name: "The Market Maestro",
    topic: "The Basics of Supply & Demand",
    duration: 10,
    bookmarked: false,
    color: "#C8FFDF",
  },
];
