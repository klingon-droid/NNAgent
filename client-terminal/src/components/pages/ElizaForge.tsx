@@ .. @@
 import { Terminal as TerminalIcon, Power, Download, FileJson, History } from 'lucide-react';
 import { FileUpload } from '../ElizaForge/FileUpload';
 import { UsernameDisplay } from '../Terminal/components/UsernameDisplay';
 import { UsernamePopup } from '../Terminal/components/UsernamePopup';
 import { userService } from '../../services/user';
 import { TerminalOutput } from '../Terminal/components/TerminalOutput';
 import { TerminalLoading } from '../Terminal/components/TerminalLoading';
 import { useIsMobile } from '../../hooks/useIsMobile';
 import { useElizaForge } from '../../hooks/useElizaForge';
 import { CharacterPreview } from '../ElizaForge/CharacterPreview';
 import { useNavigate, useLocation } from 'react-router-dom';
 import { SocialLinks } from '../SocialLinks';
 import { CharacterChat } from '../ElizaForge/CharacterChat';
+import { config } from '../../config/env';
+
+// Get AI provider from env
+const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'galadriel';
+const NORMAL_MODEL = import.meta.env.VITE_NORMAL_MODEL || 'hermes3:3b';
+const LARGE_MODEL = import.meta.env.VITE_LARGE_MODEL || 'hermes3:7b';
+const API_KEY = import.meta.env.VITE_GALADRIEL_API_KEY;
+const RATE_LIMIT_MAX = Number(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS) || 20;
+const RATE_LIMIT_WINDOW = Number(import.meta.env.VITE_RATE_LIMIT_WINDOW_MS) || 900000;

 export const ElizaForge: React.FC = () => {
   const [showUsernameInput, setShowUsernameInput] = useState(false);
   const [usernameInput, setUsernameInput] = useState('');
   const isMobile = useIsMobile();
   const navigate = useNavigate();
   const location = useLocation();
   const {
     input,
     setInput,
     output,
     isLoading,
     characterData,
     setCharacterData,
     handleCommand,
     handleKeyDown,
     downloadCharacter
   } = useElizaForge({
+    aiProvider: AI_PROVIDER,
+    normalModel: NORMAL_MODEL,
+    largeModel: LARGE_MODEL,
+    apiKey: API_KEY,
+    rateLimit: {
+      maxRequests: RATE_LIMIT_MAX,
+      windowMs: RATE_LIMIT_WINDOW
+    }
   });