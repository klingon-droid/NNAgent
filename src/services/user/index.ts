import { generateUUID } from '../../utils/uuid';

class UserService {
  private readonly USER_ID_KEY = 'symbaiex_user_id';
  private readonly ACTIVE_CHARACTER_KEY = 'symbaiex_active_character';
  private readonly USERNAME_KEY = 'symbaiex_username';
  private userId: string;
  private activeCharacter: string = 'symbaiex';
  private username: string | null = null;

  constructor() {
    this.userId = this.loadOrGenerateUserId();
    this.loadActiveCharacter();
    this.loadUsername();
  }

  private loadUsername(): void {
    const stored = localStorage.getItem(this.USERNAME_KEY);
    if (stored) {
      this.username = stored;
    }
  }

  private loadOrGenerateUserId(): string {
    const stored = localStorage.getItem(this.USER_ID_KEY);
    if (stored) return stored;

    const newId = generateUUID();
    localStorage.setItem(this.USER_ID_KEY, newId);
    return newId;
  }

  private loadActiveCharacter(): void {
    const stored = localStorage.getItem(this.ACTIVE_CHARACTER_KEY);
    if (stored) {
      this.activeCharacter = stored;
    }
  }

  getUserId(): string {
    return this.userId;
  }

  getActiveCharacter(): string {
    return this.activeCharacter;
  }

  setActiveCharacter(characterId: string): void {
    this.activeCharacter = characterId;
    localStorage.setItem(this.ACTIVE_CHARACTER_KEY, characterId);
  }

  getUsername(): string | null {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
    localStorage.setItem(this.USERNAME_KEY, username);
  }
}

// Create and export the singleton instance
export const userService = new UserService();