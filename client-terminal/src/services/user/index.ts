import { v4 as uuidv4 } from 'uuid';

class UserService {
  private readonly USER_ID_KEY = 'symbaiex_user_id';
  private readonly ACTIVE_CHARACTER_KEY = 'symbaiex_active_character';
  private userId: string;
  private activeCharacter: string = 'symbaiex'; // Default character

  constructor() {
    this.userId = this.loadOrGenerateUserId();
    this.loadActiveCharacter();
  }

  private loadOrGenerateUserId(): string {
    const stored = localStorage.getItem(this.USER_ID_KEY);
    if (stored) return stored;

    const newId = uuidv4();
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
}

export const userService = new UserService();