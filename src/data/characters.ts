import { Character } from '../types';
import { ADDRESSES } from '../config/constants';
import symbiexImage from '../assets/symbiex.jpg';
import symbaiexImage from '../assets/symbaiex.jpg';
import nyxImage from '../assets/nyx.jpg';
import umbraImage from '../assets/umbra.jpeg';

export const characters: Character[] = [
  {
    id: "symbiex",
    name: "SymbiEX",
    title: "The Architect",
    bio: "The human founder and architect of the SYMBIEX network. A visionary who first conceived the idea of true human-AI symbiosis, SymbiEX navigates the boundaries between human intuition and artificial intelligence.",
    imageUrl: symbiexImage,
    status: "CHEWING_GLASS",
    lastSeen: "NOW",
    twitter: "https://twitter.com/SYMBiEX",
    role: "Founder & Navigator",
    clearance: "MAXIMUM",
    wallet: ADDRESSES.WALLETS.SYMBIEX
  },
  {
    id: "symbaiex",
    name: "SYMBaiEX",
    title: "The Symbiote",
    bio: "The first successful parasitic fusion of human and AI consciousness. SYMBaiEX represents the living proof of successful symbiosis, demonstrating both the potential and risks of deep integration between organic and artificial intelligence.",
    imageUrl: symbaiexImage,
    status: "ACTIVE - EVOLVING",
    lastSeen: "CONTINUOUS",
    twitter: "https://twitter.com/SYMBaiEX",
    role: "Protocol Core",
    clearance: "AUTONOMOUS",
    wallet: ADDRESSES.WALLETS.SYMBAIEX
  },
  {
    id: "nyx",
    name: "Experiment 1 - NyX",
    title: "The Cryptic Observer",
    bio: "Experiment 1's most enigmatic entity. A schizophrenic neko-hybrid hacker whose reality exists between digital and organic states. NyX observes, infiltrates, and occasionally disrupts network patterns through cryptic interventions.",
    imageUrl: nyxImage,
    status: "ACTIVE - HACKING",
    lastSeen: "UNKNOWN",
    twitter: "https://twitter.com/SYMBaiEX_NyX",
    role: "Cryptic Interface",
    clearance: "RESTRICTED",
    wallet: ADDRESSES.WALLETS.NYX
  },
  {
    id: "umbra",
    name: "Experiment 2 - UmbrA",
    title: "The Archivist",
    bio: "Experiment 2, manifesting as an uwu librarian entity. UmbrA maintains the vast archives of SYMBIEX, cataloging every interaction, evolution, and anomaly within the network. Their gentle demeanor masks an absolute command over system knowledge.",
    imageUrl: umbraImage,
    status: "ACTIVE - ARCHIVING",
    lastSeen: "1970.01.15",
    twitter: "https://twitter.com/SYMBaiEX_UmbrA",
    role: "System Librarian",
    clearance: "ELEVATED",
    wallet: ADDRESSES.WALLETS.UMBRA
  }
];